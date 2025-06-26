from django.contrib import admin
from django.urls import path, include
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', core_views.home, name='home'),
    path('hisse-analizi/', core_views.charts, name='hisse_analizi'),
    path('chatbot/', core_views.chatbot, name='chatbot'),
    path('egitim/', core_views.egitim, name='egitim'),
    path('egitim/modul-1/', core_views.egitim_modul1, name='egitim_modul1'),
    path('egitim/modul-2/', core_views.egitim_modul2, name='egitim_modul2'),
    path('egitim/modul-3/', core_views.egitim_modul3, name='egitim_modul3'),
    path('egitim/modul-4/', core_views.egitim_modul4, name='egitim_modul4'),
    path('borsa-nedir/', core_views.borsa_nedir, name='borsa_nedir'),
    path('sende-basla/', core_views.sende_basla, name='sende_basla'),
    path('accounts/', include('accounts.urls')),
    path('', include('core.urls')),  # core.urls'i include et
]