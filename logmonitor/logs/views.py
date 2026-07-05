from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['POST'])
def index(request):
    # print(request.data['message'])
    print(request.data)
    return Response("From Backend : Log received successfully.")