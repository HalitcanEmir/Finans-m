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

# Ortam değişkenlerini yükle
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

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
                completion = client.chat.completions.create(
                    extra_headers={
                        "HTTP-Referer": "http://127.0.0.1:8000/", # İsteğe göre değiştirilebilir
                        "X-Title": "FinanceBot", # İsteğe göre değiştirilebilir
                    },
                    extra_body={},
                    model="deepseek/deepseek-r1-0528:free",
                    messages=[
                        {"role": "user", "content": user_input}
                    ]
                )
                response_text = completion.choices[0].message.content.strip()
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
    stock = yf.Ticker(symbol)
    hist = stock.history(period=period, interval=interval)
    if hist.empty:
        return {
            "current_price": None,
            "market_cap": None,
            "fifty_two_week_high": None,
            "fifty_two_week_low": None,
            "target_mean_price": None,
            "range_high": None,
            "range_low": None,
            "range_mean": None,
            "range_last": None,
        }
    return {
        "current_price": hist["Close"].iloc[-1],
        "market_cap": stock.info.get("marketCap"),
        "fifty_two_week_high": stock.info.get("fiftyTwoWeekHigh"),
        "fifty_two_week_low": stock.info.get("fiftyTwoWeekLow"),
        "target_mean_price": stock.info.get("targetMeanPrice"),
        "range_high": hist["Close"].max(),
        "range_low": hist["Close"].min(),
        "range_mean": hist["Close"].mean(),
        "range_last": hist["Close"].iloc[-1],
    }

def get_price_chart(symbol, period, interval):
    stock = yf.Ticker(symbol)
    hist = stock.history(period=period, interval=interval)
    plt.figure(figsize=(8, 4))
    plt.plot(hist.index, hist["Close"])
    plt.title(f"{symbol} - {period} ({interval})")
    plt.xlabel("Tarih")
    plt.ylabel("Kapanış Fiyatı")
    buf = BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    image_png = buf.getvalue()
    buf.close()
    return base64.b64encode(image_png).decode('utf-8')

def charts(request):
    context = {}
    intervals = [
        ("1h", "1 Saat", "5d", "1h"),
        ("1d", "1 Gün", "5d", "15m"),
        ("1wk", "1 Hafta", "1mo", "1h"),
        ("1mo", "1 Ay", "1mo", "1d"),
        ("3mo", "3 Ay", "3mo", "1d"),
        ("6mo", "6 Ay", "6mo", "1d"),
        ("1y", "1 Yıl", "1y", "1wk"),
        ("5y", "5 Yıl", "5y", "1mo"),
    ]
    context['intervals'] = intervals
    context['selected_interval'] = '1mo'
    context['selected_interval_label'] = '1 Ay'
    if request.method == 'POST':
        symbol = request.POST.get('symbol', '').upper().strip()
        selected = request.POST.get('interval', '1mo')
        for code, label, period, interval in intervals:
            if code == selected:
                selected_period = period
                selected_interval = interval
                context['selected_interval'] = code
                context['selected_interval_label'] = label
                break
        else:
            selected_period = '1mo'
            selected_interval = '1d'
        if symbol:
            data = get_stock_data(symbol, selected_period, selected_interval)
            context.update(data)
            context['symbol'] = symbol
            context['chart_image'] = get_price_chart(symbol, selected_period, selected_interval)
    return render(request, 'charts.html', context)