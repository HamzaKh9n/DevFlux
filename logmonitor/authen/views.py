from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


def _build_token_response(user):
    refresh = RefreshToken.for_user(user)
    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        },
        status=status.HTTP_200_OK,
    )


@api_view(['GET'])
def secure_data_view(request):
    return Response({
        "message": f"Hello {request.user.username}, you successfully accessed a secure route!"
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

    return _build_token_response(user)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    response = _build_token_response(user)
    response.status_code = status.HTTP_201_CREATED
    return response
