from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('getprojects/', views.getProjects, name='getProjects'),
    path('createproject/', views.createProject, name='createProject'),
    path('deleteproject/<str:id>/', views.deleteProject, name='deleteProject')
]