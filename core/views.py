import os
import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from dotenv import load_dotenv
from openai import OpenAI
import matplotlib.pyplot as plt
import io
import urllib, base64
from matplotlib.figure import Figure
import pandas as pd
import numpy as np
import datetime
import yfinance as yf
from io import BytesIO
from django.views.decorators.http import require_GET
from ta.trend import ADXIndicator
import mplfinance as mpf
from scipy.signal import find_peaks

# Ortam değişkenlerini yükle
load_dotenv()
# OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
# 
# client = OpenAI(
#     base_url="https://openrouter.ai/api/v1",
#     api_key=OPENROUTER_API_KEY,
# )

# Ana sayfa (Chatbot)
@csrf_exempt  # Geliştirme için, prod'da güvenlik ekle
def home(request):
    if request.method == "POST":
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                user_input = data.get("message", "")
            else:
                user_input = request.POST.get("user_input", "")
            response_text = ""
            if user_input:
                # completion = client.chat.completions.create(
                #     extra_headers={
                #         "HTTP-Referer": "http://127.0.0.1:8000/", # İsteğe göre değiştirilebilir
                #         "X-Title": "FinanceBot", # İsteğe göre değiştirilebilir
                #     },
                #     extra_body={},
                #     model="deepseek/deepseek-r1-0528:free",
                #     messages=[
                #         {"role": "user", "content": user_input}
                #     ]
                # )
                # response_text = completion.choices[0].message.content.strip()
                response_text = "API anahtarı tanımlı değil."
            else:
                response_text = "Lütfen bir mesaj girin."
            return JsonResponse({"response": response_text})
        except Exception as e:
            return JsonResponse({"response": f"Hata: {str(e)}"})
    # GET ise sayfa render et
    return render(request, "home.html")

def graphs(request):
    # Örnek veri
    x = [1, 2, 3, 4, 5]
    y = [10, 20, 15, 25, 30]

    # Grafik oluştur
    plt.switch_backend('AGG')  # arayüzsüz çizim
    plt.figure(figsize=(5, 4))
    plt.plot(x, y, color='blue', marker='o')
    plt.title('Örnek Grafik')
    plt.xlabel('X Ekseni')
    plt.ylabel('Y Ekseni')
    plt.tight_layout()

    # Görseli encode et
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png).decode('utf-8')
    buffer.close()

    return render(request, 'graphs.html', {'graph': graph})

def plot_graphs():
    dates = pd.date_range(end=datetime.datetime.today(), periods=90)
    prices = np.cumsum(np.random.randn(90)) + 100
    volumes = np.random.randint(100000, 500000, size=90)

    df = pd.DataFrame({
        'Date': dates,
        'Price': prices,
        'Volume': volumes
    })

    # RSI
    delta = df['Price'].diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()
    rs = avg_gain / avg_loss
    df['RSI'] = 100 - (100 / (1 + rs))

    # MACD
    ema12 = df['Price'].ewm(span=12, adjust=False).mean()
    ema26 = df['Price'].ewm(span=26, adjust=False).mean()
    df['MACD'] = ema12 - ema26
    df['Signal'] = df['MACD'].ewm(span=9, adjust=False).mean()

    fig = Figure(figsize=(10, 8))
    axs = fig.subplots(3, 1)

    axs[0].plot(df['Date'], df['Price'])
    axs[0].set_title('Fiyat')

    axs[1].bar(df['Date'], df['Volume'], color='gray')
    axs[1].set_title('İşlem Hacmi')

    axs[2].plot(df['Date'], df['RSI'], label='RSI', color='orange')
    axs[2].plot(df['Date'], df['MACD'], label='MACD', color='blue')
    axs[2].plot(df['Date'], df['Signal'], label='Signal', color='red')
    axs[2].legend()
    axs[2].set_title('RSI & MACD')

    # Görseli base64 olarak encode et
    buf = io.BytesIO()
    fig.tight_layout()
    fig.savefig(buf, format='png')
    buf.seek(0)
    image_png = buf.getvalue()
    buf.close()
    return base64.b64encode(image_png).decode('utf-8')

def grafik_view(request):
    chart = plot_graphs()
    return render(request, 'grafikler.html', {'chart': chart})

def get_stock_data(symbol, period, interval):
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period, interval=interval)
        info = stock.info
        
        # Print debug information
        print(f"Symbol: {symbol}")
        print(f"History data available: {not hist.empty if hist is not None else False}")
        print(f"Info data available: {bool(info)}")
        
        pe_ratio = info.get("trailingPE") or info.get("forwardPE") or "Veri yok"
        pb_ratio = info.get("priceToBook", "Veri yok")
        roe = info.get("returnOnEquity", "Veri yok")
        de_ratio = info.get("debtToEquity", "Veri yok")
        
        if hist is None or hist.empty:
            print(f"No historical data found for {symbol}")
            return {
                "error": f"Hisse senedi verisi bulunamadı: {symbol}",
                "current_price": None,
                "market_cap": None,
                "fifty_two_week_high": None,
                "fifty_two_week_low": None,
                "target_mean_price": None,
                "range_high": None,
                "range_low": None,
                "range_mean": None,
                "range_last": None,
                "pe_ratio": pe_ratio,
                "pb_ratio": pb_ratio,
                "roe": roe,
                "de_ratio": de_ratio,
            }
            
        return {
            "current_price": hist["Close"].iloc[-1] if not hist.empty else None,
            "market_cap": info.get("marketCap"),
            "fifty_two_week_high": info.get("fiftyTwoWeekHigh"),
            "fifty_two_week_low": info.get("fiftyTwoWeekLow"),
            "target_mean_price": info.get("targetMeanPrice"),
            "range_high": hist["Close"].max() if not hist.empty else None,
            "range_low": hist["Close"].min() if not hist.empty else None,
            "range_mean": hist["Close"].mean() if not hist.empty else None,
            "range_last": hist["Close"].iloc[-1] if not hist.empty else None,
            "pe_ratio": pe_ratio,
            "pb_ratio": pb_ratio,
            "roe": roe,
            "de_ratio": de_ratio,
        }
    except Exception as e:
        print(f"Error fetching data for {symbol}: {str(e)}")
        return {
            "error": f"Veri çekilirken hata oluştu: {str(e)}",
            "current_price": None,
            "market_cap": None,
            "fifty_two_week_high": None,
            "fifty_two_week_low": None,
            "target_mean_price": None,
            "range_high": None,
            "range_low": None,
            "range_mean": None,
            "range_last": None,
            "pe_ratio": "Veri yok",
            "pb_ratio": "Veri yok",
            "roe": "Veri yok",
            "de_ratio": "Veri yok",
        }

def get_price_volume_chart(symbol, period, interval):
    try:
        # Matplotlib backend'i ayarla
        plt.switch_backend('Agg')
        
        # Veriyi çek
        stock = yf.download(symbol, period=period, interval=interval, progress=False, auto_adjust=True)
        
        # Veri kontrolü
        if stock is None or stock.empty:
            print(f"No data found for {symbol}")
            return None
            
        # DataFrame'in gerekli sütunları içerdiğinden emin ol
        required_columns = ['Close', 'Volume']
        if not all(col in stock.columns for col in required_columns):
            print(f"Missing required columns for {symbol}")
            return None
            
        # Önceki grafikleri temizle
        plt.clf()
        plt.close('all')
            
        # Yeni figür oluştur
        fig = plt.figure(figsize=(12, 6))
        
        # Ana grafik alanı
        ax1 = fig.add_subplot(111)
        
        # Fiyat çizgisi (sol y ekseni)
        color = 'tab:blue'
        ax1.set_xlabel('Tarih')
        ax1.set_ylabel('Fiyat ($)', color=color)
        ax1.plot(stock.index, stock['Close'], color=color)
        ax1.tick_params(axis='y', labelcolor=color)
        
        # Hacim barları (sağ y ekseni)
        ax2 = ax1.twinx()
        color = 'tab:gray'
        ax2.set_ylabel('Hacim', color=color)
        ax2.bar(stock.index, stock['Volume'], color=color, alpha=0.3)
        ax2.tick_params(axis='y', labelcolor=color)
        
        # Başlık
        plt.title(f'{symbol} Fiyat ve Hacim Grafiği')
        
        # Grafik düzeni
        plt.tight_layout()
        
        # Görseli kaydet
        img = BytesIO()
        plt.savefig(img, format='png', dpi=100, bbox_inches='tight')
        plt.close(fig)
        img.seek(0)
        
        # Base64'e çevir
        plot_url = base64.b64encode(img.getvalue()).decode('utf-8')
        img.close()
        
        return plot_url
        
    except Exception as e:
        print(f"Error creating price-volume chart for {symbol}: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def get_price_chart(symbol, period, interval):
    try:
        # Matplotlib backend'i ayarla
        plt.switch_backend('Agg')
        
        # Veriyi çek
        stock = yf.download(symbol, period=period, interval=interval, progress=False, auto_adjust=True)
        
        if stock is None or stock.empty:
            return None
            
        # Önceki grafikleri temizle
        plt.clf()
        plt.close('all')
        
        # Yeni figür oluştur
        fig = plt.figure(figsize=(10, 5))
        plt.plot(stock.index, stock["Close"], color='tab:blue')
        plt.title(f"{symbol} - {period} ({interval})")
        plt.xlabel("Tarih")
        plt.ylabel("Kapanış Fiyatı ($)")
        plt.grid(True, alpha=0.3)
        
        # Grafik düzeni
        plt.tight_layout()
        
        # Görseli kaydet
        img = BytesIO()
        plt.savefig(img, format='png', dpi=100, bbox_inches='tight')
        plt.close(fig)
        img.seek(0)
        
        # Base64'e çevir
        plot_url = base64.b64encode(img.getvalue()).decode('utf-8')
        img.close()
        
        return plot_url
        
    except Exception as e:
        print(f"Error creating price chart for {symbol}: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def get_timestamp():
    return datetime.datetime.now().strftime("%d.%m.%Y %H:%M:%S")

def fiyat_hacim_grafik(sembol, period="6mo", interval="1d"):
    df = yf.download(sembol, period=period, interval=interval)
    if df is None or df.empty:
        return None
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = ['_'.join([str(i) for i in col if i]) for col in df.columns.values]
    close_col = [col for col in df.columns if 'close' in col.lower()][0] if any('close' in col.lower() for col in df.columns) else None
    volume_col = [col for col in df.columns if 'volume' in col.lower()][0] if any('volume' in col.lower() for col in df.columns) else None
    if not close_col or not volume_col:
        return None
    df = df[[close_col, volume_col]].dropna()
    fig, ax1 = plt.subplots(figsize=(10, 5))
    ax1.set_title(f'{sembol.upper()} - Fiyat ve Hacim Grafiği')
    ax1.plot(df.index, df[close_col], color='blue', label='Fiyat (Close)')
    ax1.set_ylabel('Fiyat ($)', color='blue')
    ax1.tick_params(axis='y', labelcolor='blue')
    ax2 = ax1.twinx()
    ax2.bar(df.index, df[volume_col], color='gray', alpha=0.3, label='Hacim (Volume)')
    ax2.set_ylabel('Hacim', color='gray')
    ax2.tick_params(axis='y', labelcolor='gray')
    fig.tight_layout()
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png).decode('utf-8')
    plt.close(fig)
    return graphic

def hisse_bilgi(sembol):
    try:
        ticker = yf.Ticker(sembol)
        info = ticker.info
        return {
            'son_fiyat': info.get('regularMarketPrice'),
            'piyasa_degeri': info.get('marketCap'),
            '52h_yuksek': info.get('fiftyTwoWeekHigh'),
            '52h_dusuk': info.get('fiftyTwoWeekLow'),
            'hacim': info.get('volume'),
            'hedef_fiyat': info.get('targetMeanPrice'),
            'sirket_adi': info.get('shortName') or info.get('longName') or sembol,
            'para_birimi': info.get('currency'),
        }
    except Exception as e:
        print(f"Hisse bilgi çekilemedi: {e}")
        return {}

def ma_grafik(sembol, period="6mo", interval="1d"):
    df = yf.download(sembol, period=period, interval=interval)
    if df is None or df.empty:
        return None, None, None
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = ['_'.join([str(i) for i in col if i]) for col in df.columns.values]
    close_col = [col for col in df.columns if 'close' in col.lower()][0] if any('close' in col.lower() for col in df.columns) else None
    if not close_col:
        return None, None, None
    df['MA50'] = df[close_col].rolling(window=50, min_periods=1).mean()
    df['MA200'] = df[close_col].rolling(window=200, min_periods=1).mean()
    fig, ax = plt.subplots(figsize=(10, 5))
    ax.plot(df.index, df[close_col], label='Kapanış Fiyatı', color='blue')
    ax.plot(df.index, df['MA50'], label='MA50 (50 Günlük Ortalama)', color='orange')
    ax.plot(df.index, df['MA200'], label='MA200 (200 Günlük Ortalama)', color='green')
    ax.set_title(f'{sembol.upper()} - MA50 & MA200 Hareketli Ortalamalar')
    ax.legend()
    ax.grid(True, alpha=0.3)
    fig.tight_layout()
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png).decode('utf-8')
    plt.close(fig)
    ma50_val = df['MA50'].dropna().iloc[-1] if not df['MA50'].dropna().empty else None
    ma200_val = df['MA200'].dropna().iloc[-1] if not df['MA200'].dropna().empty else None
    return graphic, ma50_val, ma200_val

def get_candlestick_chart(symbol='AAPL', period='6mo', interval='1d'):
    import yfinance as yf
    import mplfinance as mpf
    import io
    import base64
    # Veri çek
    data = yf.download(symbol, period=period, interval=interval)
    if data is None or data.empty:
        return None
    # MultiIndex düzleştirme
    if isinstance(data.columns, pd.MultiIndex):
        data.columns = [col[0] for col in data.columns]
    data.index.name = 'Date'  # Zorunlu format
    candle_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
    if not all(col in data.columns for col in candle_cols):
        return None
    data = data[candle_cols]
    try:
        fig, _ = mpf.plot(
            data,
            type='candle',
            mav=(20, 50),
            volume=True,
            style='charles',
            title=f'{symbol} Mum Grafiği',
            returnfig=True,
            figsize=(12, 6)
        )
        buf = io.BytesIO()
        fig.savefig(buf, format='png')
        buf.seek(0)
        encoded = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        plt.close(fig)
        return encoded
    except Exception:
        return None

def charts(request):
    intervals = [
        ("1d", "1 Gün", "5d", "1d"),
        ("1wk", "1 Hafta", "1mo", "1d"),
        ("1mo", "1 Ay", "1mo", "1d"),
        ("3mo", "3 Ay", "3mo", "1d"),
        ("6mo", "6 Ay", "6mo", "1d"),
        ("1y", "1 Yıl", "1y", "1wk"),
        ("5y", "5 Yıl", "5y", "1mo"),
    ]
    selected_code = '6mo'
    selected_label = '6 Ay'
    selected_period = '6mo'
    selected_interval = '1d'
    if request.method == 'POST':
        selected_code = request.POST.get('interval', '6mo')
        for code, label, period, interval in intervals:
            if code == selected_code:
                selected_label = label
                selected_period = period
                selected_interval = interval
                break
    sembol = request.POST.get('symbol', 'NVDA')
    if not sembol:
        sembol = 'NVDA'
    sembol = str(sembol).strip().upper()
    grafik1 = fiyat_hacim_grafik(sembol, selected_period, selected_interval)
    hisse = hisse_bilgi(sembol)
    ma_chart, ma50_val, ma200_val = ma_grafik(sembol, selected_period, selected_interval)
    # --- RSI GRAFİĞİ ---
    try:
        data = yf.download(sembol, period=selected_period, interval=selected_interval, progress=False, auto_adjust=True)
        candlestick_grafik = None
        candlestick_error = None
        if data is not None and not data.empty:
            # MultiIndex düzleştirme (özellikle tek sembollü veri için)
            if isinstance(data.columns, pd.MultiIndex):
                data.columns = [col[0] for col in data.columns]
            candle_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
            if all(col in data.columns for col in candle_cols):
                data_candle = data[candle_cols].copy()
                data_candle.index.name = 'Date'
                try:
                    fig_candle, _ = mpf.plot(
                        data_candle,
                        type='candle',
                        volume=True,
                        mav=(20, 50),
                        style='charles',
                        returnfig=True,
                        figsize=(12, 6)
                    )
                    buf = BytesIO()
                    fig_candle.savefig(buf, format='png')
                    buf.seek(0)
                    candlestick_grafik = base64.b64encode(buf.read()).decode('utf-8')
                    buf.close()
                    plt.close(fig_candle)
                except Exception as ex:
                    candlestick_grafik = None
                    candlestick_error = f"Mum grafik çizim hatası: {ex}"
            else:
                candlestick_grafik = None
                candlestick_error = "Mum grafik için gerekli sütunlar (Open, High, Low, Close, Volume) bulunamadı."
        else:
            candlestick_grafik = None
            candlestick_error = "Bu sembol için fiyat verisi bulunamadı. Lütfen geçerli bir sembol girin."
        # MultiIndex düzleştirme
        if data is not None and isinstance(data.columns, pd.MultiIndex):
            data.columns = ['_'.join([str(i) for i in col if i]) for col in data.columns.values]
        # 'Close', 'High', 'Low' sütunlarını bul
        close_col = [col for col in data.columns if 'close' in col.lower()] if data is not None else []
        high_col = [col for col in data.columns if 'high' in col.lower()] if data is not None else []
        low_col = [col for col in data.columns if 'low' in col.lower()] if data is not None else []
        if close_col and high_col and low_col:
            close_col = close_col[0]
            high_col = high_col[0]
            low_col = low_col[0]
        else:
            rsi_grafik = None
            macd_grafik = None
            bollinger_grafik = None
            adx_grafik = None
            temettu_grafik = None
            kazanc_grafik = None
            candlestick_grafik = None
            destek_direnc_grafik = None
            context = {
                'sembol': sembol,
                'fiyat_hacim_grafik': grafik1,
                'hisse': hisse,
                'intervals': intervals,
                'selected_code': selected_code,
                'selected_label': selected_label,
                'ma_chart': ma_chart,
                'ma50_val': ma50_val,
                'ma200_val': ma200_val,
                'rsi_grafik': None,
                'macd_grafik': None,
                'bollinger_grafik': None,
                'adx_grafik': None,
                'temettu_grafik': None,
                'kazanc_grafik': None,
                'candlestick_grafik': None,
                'candlestick_error': candlestick_error,
                'error': 'Veri sütunları uyumsuz veya gerekli fiyat sütunları bulunamadı.',
                'destek_direnc_grafik': destek_direnc_grafik,
            }
            return render(request, 'charts.html', context)
        rsi_grafik = None
        macd_grafik = None
        bollinger_grafik = None
        adx_grafik = None
        temettu_grafik = None
        kazanc_grafik = None
        candlestick_grafik = None
        destek_direnc_grafik = None
        if data is not None and not data.empty:
            # RSI
            data['RSI'] = calculate_rsi(data.rename(columns={close_col: 'Close'}))
            fig_rsi, ax_rsi = plt.subplots(figsize=(14,4))
            ax_rsi.plot(data.index, data['RSI'], label='RSI')
            ax_rsi.axhline(70, color='red', linestyle='--', label='Aşırı Alım')
            ax_rsi.axhline(30, color='green', linestyle='--', label='Aşırı Satım')
            ax_rsi.set_title(f'{sembol} RSI Göstergesi')
            ax_rsi.legend()
            ax_rsi.grid(True)
            fig_rsi.tight_layout()
            rsi_grafik = grafik_to_base64(fig_rsi)
            # MACD
            exp1 = data[close_col].ewm(span=12, adjust=False).mean()
            exp2 = data[close_col].ewm(span=26, adjust=False).mean()
            macd = exp1 - exp2
            signal = macd.ewm(span=9, adjust=False).mean()
            fig_macd, ax_macd = plt.subplots(figsize=(14,4))
            ax_macd.plot(data.index, macd, label='MACD')
            ax_macd.plot(data.index, signal, label='Sinyal Çizgisi')
            ax_macd.axhline(0, color='gray', linestyle='--')
            ax_macd.set_title(f'{sembol} MACD Göstergesi')
            ax_macd.legend()
            ax_macd.grid(True)
            fig_macd.tight_layout()
            macd_grafik = grafik_to_base64(fig_macd)
            # Bollinger Bands
            ma20 = data[close_col].rolling(window=20).mean()
            std = data[close_col].rolling(window=20).std()
            upper_band = ma20 + (2 * std)
            lower_band = ma20 - (2 * std)
            fig_boll, ax_boll = plt.subplots(figsize=(14,5))
            ax_boll.plot(data.index, data[close_col], label='Kapanış')
            ax_boll.plot(data.index, ma20, label='20 Günlük MA')
            ax_boll.plot(data.index, upper_band, label='Üst Bant')
            ax_boll.plot(data.index, lower_band, label='Alt Bant')
            ax_boll.fill_between(data.index, lower_band, upper_band, color='lightgrey', alpha=0.3)
            ax_boll.set_title(f"{sembol} Bollinger Bantları")
            ax_boll.legend()
            ax_boll.grid(True)
            fig_boll.tight_layout()
            bollinger_grafik = grafik_to_base64(fig_boll)
            # ADX
            high_series = data[high_col]
            low_series = data[low_col]
            close_series = data[close_col]
            if isinstance(high_series, pd.DataFrame):
                high_series = high_series.iloc[:, 0]
            if isinstance(low_series, pd.DataFrame):
                low_series = low_series.iloc[:, 0]
            if isinstance(close_series, pd.DataFrame):
                close_series = close_series.iloc[:, 0]
            adx_indicator = ADXIndicator(high=high_series, low=low_series, close=close_series, window=14)
            data['ADX'] = adx_indicator.adx()
            fig_adx, ax_adx = plt.subplots(figsize=(14,4))
            ax_adx.plot(data.index, data['ADX'], label='ADX', color='purple')
            ax_adx.axhline(25, color='orange', linestyle='--', label='Güçlü Trend Eşiği')
            ax_adx.set_title(f'{sembol} ADX Göstergesi')
            ax_adx.legend()
            ax_adx.grid(True)
            fig_adx.tight_layout()
            adx_grafik = grafik_to_base64(fig_adx)
            # Temettü ve Kazanç
            ticker = yf.Ticker(sembol)
            dividends = ticker.dividends
            earnings = ticker.earnings
            # Temettü grafiği
            if hasattr(dividends, 'empty') and not dividends.empty:
                fig_div, ax_div = plt.subplots(figsize=(12, 4))
                dividends.plot(kind='bar', color='green', ax=ax_div)
                ax_div.set_title(f"{sembol} Temettü Tarihçesi")
                ax_div.set_ylabel("USD")
                ax_div.grid(True)
                fig_div.tight_layout()
                temettu_grafik = grafik_to_base64(fig_div)
            else:
                temettu_grafik = None
            # Kazanç grafiği
            if hasattr(earnings, 'empty') and not earnings.empty and 'Revenue' in earnings.columns and 'Earnings' in earnings.columns:
                fig_earn, ax_earn = plt.subplots(figsize=(12, 4))
                ax_earn.bar(earnings.index - 0.2, earnings['Revenue'], width=0.4, label='Revenue', color='blue')
                ax_earn.bar(earnings.index + 0.2, earnings['Earnings'], width=0.4, label='Net Income', color='orange')
                ax_earn.set_title(f"{sembol} Yıllık Kazançlar")
                ax_earn.set_ylabel("USD")
                ax_earn.legend()
                ax_earn.grid(True)
                fig_earn.tight_layout()
                kazanc_grafik = grafik_to_base64(fig_earn)
            else:
                kazanc_grafik = None
            # Destek ve Direnç Seviyeleri
            if data is not None and not data.empty and 'Close' in data.columns:
                try:
                    # Tepe ve dip noktalarını bul
                    peaks, _ = find_peaks(data['Close'], distance=5, prominence=1)
                    troughs, _ = find_peaks(-data['Close'], distance=5, prominence=1)
                    peak_levels = data['Close'].iloc[peaks]
                    trough_levels = data['Close'].iloc[troughs]
                    direnc_seviyeleri = peak_levels.sort_values(ascending=False).head(3)
                    destek_seviyeleri = trough_levels.sort_values().head(3)
                    fig_sd, ax_sd = plt.subplots(figsize=(14,7))
                    ax_sd.plot(data['Close'], label='Kapanış Fiyatı')
                    for level in direnc_seviyeleri:
                        ax_sd.axhline(y=level, color='red', linestyle='--', linewidth=1, label='Direnç')
                    for level in destek_seviyeleri:
                        ax_sd.axhline(y=level, color='green', linestyle='--', linewidth=1, label='Destek')
                    ax_sd.set_title('Destek ve Direnç Seviyeleri')
                    ax_sd.legend()
                    ax_sd.grid()
                    fig_sd.tight_layout()
                    buf = BytesIO()
                    fig_sd.savefig(buf, format='png')
                    buf.seek(0)
                    destek_direnc_grafik = base64.b64encode(buf.read()).decode('utf-8')
                    buf.close()
                    plt.close(fig_sd)
                except Exception:
                    destek_direnc_grafik = None
            else:
                destek_direnc_grafik = None
        else:
            rsi_grafik = None
            macd_grafik = None
            bollinger_grafik = None
            adx_grafik = None
            temettu_grafik = None
            kazanc_grafik = None
            candlestick_grafik = None
            destek_direnc_grafik = None
    except Exception as e:
        rsi_grafik = None
        macd_grafik = None
        bollinger_grafik = None
        adx_grafik = None
        temettu_grafik = None
        kazanc_grafik = None
        candlestick_grafik = None
        destek_direnc_grafik = None
    candlestick_chart = get_candlestick_chart(sembol, period=selected_period, interval=selected_interval)
    context = {
        'sembol': sembol,
        'fiyat_hacim_grafik': grafik1,
        'hisse': hisse,
        'intervals': intervals,
        'selected_code': selected_code,
        'selected_label': selected_label,
        'ma_chart': ma_chart,
        'ma50_val': ma50_val,
        'ma200_val': ma200_val,
        'rsi_grafik': rsi_grafik,
        'macd_grafik': macd_grafik,
        'bollinger_grafik': bollinger_grafik,
        'adx_grafik': adx_grafik,
        'temettu_grafik': temettu_grafik,
        'kazanc_grafik': kazanc_grafik,
        'candlestick_grafik': candlestick_grafik,
        'candlestick_error': candlestick_error,
        'candlestick_chart': candlestick_chart,
        'destek_direnc_grafik': destek_direnc_grafik,
    }
    return render(request, 'charts.html', context)

def calculate_rsi(data, period=14):
    delta = data['Close'].diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)
    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

# RSI grafiği ve açıklaması için view
@require_GET
def rsi_chart_view(request):
    symbol = request.GET.get('symbol', 'NVDA')
    period = request.GET.get('period', '6mo')
    interval = request.GET.get('interval', '1d')
    data = yf.download(symbol, period=period, interval=interval)
    if data is None or data.empty:
        return render(request, 'rsi_chart.html', {'error': 'Veri bulunamadı.'})
    data['RSI'] = calculate_rsi(data)
    # Tablo için: tarih ve RSI değerlerini hazırla
    rsi_table = [
        {'date': idx.strftime('%Y-%m-%d'), 'rsi': f'{row:.2f}' if not pd.isna(row) else '-'}
        for idx, row in zip(data.index, data['RSI'])
    ]
    plt.switch_backend('Agg')
    plt.figure(figsize=(14,4))
    plt.plot(data.index, data['RSI'], label='RSI')
    plt.axhline(70, color='r', linestyle='--', label='Aşırı Alım')
    plt.axhline(30, color='g', linestyle='--', label='Aşırı Satım')
    plt.title(f'{symbol} RSI Göstergesi')
    plt.legend()
    plt.grid()
    plt.tight_layout()
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    image_png = buf.getvalue()
    buf.close()
    rsi_graphic = base64.b64encode(image_png).decode('utf-8')
    plt.close()
    rsi_info = """
    <b>RSI (Relative Strength Index)</b> teknik analizde aşırı alım ve aşırı satım bölgelerini gösteren bir göstergedir.<br>
    <ul>
    <li>RSI > 70: Aşırı alım (fiyat çok yükselmiş, düzeltme gelebilir)</li>
    <li>RSI < 30: Aşırı satım (fiyat çok düşmüş, toparlanma gelebilir)</li>
    </ul>
    """
    context = {
        'symbol': symbol,
        'rsi_graphic': rsi_graphic,
        'rsi_info': rsi_info,
        'rsi_table': rsi_table,
    }
    return render(request, 'rsi_chart.html', context)

def grafik_to_base64(fig):
    buf = BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    plt.close(fig)
    return img_base64

@require_GET
def rsi_macd_grafik_view(request):
    symbol = request.GET.get('symbol', 'NVDA')
    period = request.GET.get('period', '6mo')
    interval = request.GET.get('interval', '1d')
    # Periyot limiti (ör: 10 yıldan fazla ise uyarı)
    max_periods = ['max', '20y', '15y', '10y']
    if period in max_periods:
        return render(request, 'rsi_macd_grafikler.html', {'error': 'Çok uzun periyot seçildi. Lütfen daha kısa bir periyot seçin.'})
    try:
        data = yf.download(symbol, period=period, interval=interval, progress=False, auto_adjust=True)
    except Exception as e:
        return render(request, 'rsi_macd_grafikler.html', {'error': f'Veri çekilemedi: {str(e)}'})
    if data is None or data.empty or 'Close' not in data.columns:
        return render(request, 'rsi_macd_grafikler.html', {'error': 'Veri bulunamadı veya eksik.'})
    # RSI
    data['RSI'] = calculate_rsi(data)
    fig_rsi, ax_rsi = plt.subplots(figsize=(14,4))
    ax_rsi.plot(data.index, data['RSI'], label='RSI')
    ax_rsi.axhline(70, color='red', linestyle='--', label='Aşırı Alım')
    ax_rsi.axhline(30, color='green', linestyle='--', label='Aşırı Satım')
    ax_rsi.set_title(f'{symbol} RSI Göstergesi')
    ax_rsi.legend()
    ax_rsi.grid(True)
    fig_rsi.tight_layout()
    rsi_base64 = grafik_to_base64(fig_rsi)
    # MACD
    exp1 = data['Close'].ewm(span=12, adjust=False).mean()
    exp2 = data['Close'].ewm(span=26, adjust=False).mean()
    macd = exp1 - exp2
    signal = macd.ewm(span=9, adjust=False).mean()
    fig_macd, ax_macd = plt.subplots(figsize=(14,4))
    ax_macd.plot(data.index, macd, label='MACD')
    ax_macd.plot(data.index, signal, label='Sinyal Çizgisi')
    ax_macd.axhline(0, color='gray', linestyle='--')
    ax_macd.set_title(f'{symbol} MACD Göstergesi')
    ax_macd.legend()
    ax_macd.grid(True)
    fig_macd.tight_layout()
    macd_base64 = grafik_to_base64(fig_macd)
    # MA50 & MA200 Hareketli Ortalamalar
    ma50 = data['Close'].rolling(window=50, min_periods=1).mean()
    ma200 = data['Close'].rolling(window=200, min_periods=1).mean()
    fig_ma, ax_ma = plt.subplots(figsize=(14,4))
    ax_ma.plot(data.index, data['Close'], label='Kapanış Fiyatı', color='blue')
    ax_ma.plot(data.index, ma50, label='MA50 (50 Günlük Ortalama)', color='orange')
    ax_ma.plot(data.index, ma200, label='MA200 (200 Günlük Ortalama)', color='green')
    ax_ma.set_title(f'{symbol} - MA50 & MA200 Hareketli Ortalamalar')
    ax_ma.legend()
    ax_ma.grid(True, alpha=0.3)
    fig_ma.tight_layout()
    ma_base64 = grafik_to_base64(fig_ma)
    return render(request, 'rsi_macd_grafikler.html', {
        'symbol': symbol,
        'rsi_grafik': rsi_base64,
        'macd_grafik': macd_base64,
        'ma_grafik': ma_base64,
    })

def egitim(request):
    return render(request, 'egitim.html')

def egitim_modul1(request):
    return render(request, 'egitim_modul1.html')

def egitim_modul2(request):
    return render(request, 'egitim_modul2.html')

def egitim_modul3(request):
    return render(request, 'egitim_modul3.html')

def egitim_modul4(request):
    return render(request, 'egitim_modul4.html')

def yatirimcilar(request):
    return render(request, 'yatirimcilar.html')

def borsa_nedir(request):
    return render(request, 'borsa_nedir.html')

def chatbot(request):
    if request.method == "POST":
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                user_input = data.get("message", "")
            else:
                user_input = request.POST.get("user_input", "")
            response_text = ""
            if user_input:
                # completion = client.chat.completions.create(
                #     ...
                # )
                # response_text = completion.choices[0].message.content.strip()
                response_text = "API anahtarı tanımlı değil."
            else:
                response_text = "Lütfen bir mesaj girin."
            return JsonResponse({"response": response_text})
        except Exception as e:
            return JsonResponse({"response": f"Hata: {str(e)}"})
    return render(request, "chatbot.html")

def sende_basla(request):
    return render(request, 'sende_basla.html')