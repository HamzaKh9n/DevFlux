from enum import unique
from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.

class Project(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4)
    name = models.CharField(max_length=250)
    key = models.CharField(max_length=250, default=uuid.uuid4, unique=True)
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)