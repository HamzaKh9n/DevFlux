from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User
from .models import Project
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

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
    projects = user.projects.values()
    return Response(projects)

@api_view(['POST'])
@parser_classes([JSONParser, MultiPartParser, FormParser]) 
def createProject(request):
    print("gptttt request",request.data)
    # parser_classes = [JSONParser, MultiPartParser, FormParser] 
    name = request.data.get('name')
    if not name:
        return Response({"error":"name is required"},status = 400)
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
    projects = Project.objects.create(user = user, name = name)
    return Response(user.projects.values())
    
@api_view(['DELETE'])
def deleteProject(request, id):
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
    project = Project.objects.get(id = id)
    if project.user != user:
        return Response({"error":"unauthorized"}, status = 401)
    project.delete()
    return Response({"success":"project deleted"})
    