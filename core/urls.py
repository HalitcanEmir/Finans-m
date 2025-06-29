from django.urls import path
from . import views
from .views import investment_projection

urlpatterns = [
    path('yatirimcilar/', views.yatirimcilar, name='yatirimcilar'),
    path('hikaye/', views.rastgele_hikaye, name='rastgele_hikaye'),
    path('investment-projection/', investment_projection, name='investment_projection'),
    path('delete_comment/<int:comment_id>/', views.delete_comment, name='delete_comment'),
    # ... existing paths ...
] 