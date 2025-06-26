from django.contrib import admin
from .models import YatirimciHikaye, FaqQuestion, GlossaryTerm

@admin.register(YatirimciHikaye)
class YatirimciHikayeAdmin(admin.ModelAdmin):
    list_display = ('isim', 'zorluk', 'bugunku_durum')
    search_fields = ('isim',)

@admin.register(FaqQuestion)
class FaqQuestionAdmin(admin.ModelAdmin):
    list_display = ('question', 'short_answer', 'icon')
    search_fields = ('question',)

@admin.register(GlossaryTerm)
class GlossaryTermAdmin(admin.ModelAdmin):
    list_display = ('term', 'definition')
    search_fields = ('term',)
