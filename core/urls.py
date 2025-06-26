from django.urls import path
from . import views

urlpatterns = [
    path('yatirimcilar/', views.yatirimcilar, name='yatirimcilar'),
    path('hikaye/', views.rastgele_hikaye, name='rastgele_hikaye'),
    # ... existing paths ...
] 