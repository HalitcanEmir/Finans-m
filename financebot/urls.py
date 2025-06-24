from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),            # Ana sayfa: Chatbot
    path('charts/', views.charts, name='charts'), # Grafik sayfası
]