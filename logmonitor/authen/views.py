from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def me(request):

    access_token = request.headers.get('Authorization', '').split(' ')[1] if 'Authorization' in request.headers else None
    if not access_token:
        return Response({"error": "Access token is required."}, status=401)
    
    user_id = AccessToken(access_token).get('user_id')
    user = User.objects.filter(id=user_id)
    if user.exists():
        user = user.first()
        return Response({"username": user.username}, status=200)
    else:
        return Response({"error": "User not found."}, status=404)


@api_view(['POST'])
def signup_view(request):
    print('yooooooooooooo')
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)

    from django.contrib.auth.models import User
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=400)

    user = User.objects.create_user(username=username, password=password)
    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=201)
