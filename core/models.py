from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class VirtualPortfolio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.FloatField(default=100000.0)  # Başlangıç bakiyesi

class VirtualHolding(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    quantity = models.FloatField()
    avg_price = models.FloatField()

class VirtualTransaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_symbol = models.CharField(max_length=10)
    quantity = models.FloatField()
    price = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=10)  # 'buy' veya 'sell'

class YatirimciHikaye(models.Model):
    isim = models.CharField(max_length=100)
    zorluk = models.TextField()
    bugunku_durum = models.TextField()

    def __str__(self):
        return self.isim

    class Meta:
        verbose_name = "Yatırımcı Hikayesi"
        verbose_name_plural = "Yatırımcı Hikayeleri"

# Mini SSS (Sık Sorulan Sorular) Modeli
class FaqQuestion(models.Model):
    question = models.CharField(max_length=255)
    short_answer = models.CharField(max_length=255)
    long_answer = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True)  # Emoji veya ikon ismi

    def __str__(self):
        return self.question

    class Meta:
        verbose_name = "SSS Sorusu"
        verbose_name_plural = "SSS Soruları"

# Yatırım Terimleri Sözlüğü Modeli
class GlossaryTerm(models.Model):
    term = models.CharField(max_length=100)
    definition = models.CharField(max_length=255)
    tooltip_text = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.term

    class Meta:
        verbose_name = "Yatırım Terimi"
        verbose_name_plural = "Yatırım Terimleri"

class StockComment(models.Model):
    symbol = models.CharField(max_length=20)
    user = models.CharField(max_length=100)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.symbol} - {self.user} - {self.created_at}"
