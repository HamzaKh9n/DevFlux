from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
from .models import Project

# Create your views here.

@api_view(['POST'])
def index(request):
    # print(request.data['message'])
    print(request.data)
    return Response("From Backend : Log received successfully.")

@api_view(['GET'])
def getProjects(request):
    access = request.headers.get("Authorization").split(' ')[1]
    if not access:
        return Response({'error':"no token"}, status = 401)
    user_id = None
    try:
        user_id = AccessToken(access)['user_id']
        print(user_id)
    except Exception as e:
        print(e)
        return Response({"error":"invalid token"}, status = 401)
    user = User.objects.get(id = user_id)
    projects = Project.objects.filter(user = user).values()
    return Response(projects)
