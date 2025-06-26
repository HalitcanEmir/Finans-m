from django.contrib import admin
from .models import YatirimciHikaye

@admin.register(YatirimciHikaye)
class YatirimciHikayeAdmin(admin.ModelAdmin):
    list_display = ('isim', 'zorluk', 'bugunku_durum')
    search_fields = ('isim',)
