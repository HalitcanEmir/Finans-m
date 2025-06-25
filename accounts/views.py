from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

# Create your views here.

def register_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = User.objects.create_user(username=email, email=email, password=password)
        login(request, user)
        return redirect('sende_basla')
    return render(request, 'register.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)
        if user:
            login(request, user)
            return redirect('sende_basla')
        else:
            return render(request, 'login.html', {'error': 'Hatalı giriş'})
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')
