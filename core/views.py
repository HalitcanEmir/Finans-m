import os
import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from dotenv import load_dotenv
from openai import OpenAI

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

# Grafik sayfası
def charts(request):
    return render(request, "charts.html")