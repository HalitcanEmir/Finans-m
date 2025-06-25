from django.contrib import admin
from django.urls import path
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core_views.home, name='home'),
    path('hisse-analizi/', core_views.charts, name='hisse_analizi'),
    path('chatbot/', core_views.chatbot, name='chatbot'),
    path('egitim/', core_views.egitim, name='egitim'),
    path('yatirimcilar/', core_views.yatirimcilar, name='yatirimcilar'),
    path('borsa-nedir/', core_views.borsa_nedir, name='borsa_nedir'),
]