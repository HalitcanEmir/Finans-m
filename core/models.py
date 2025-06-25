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
