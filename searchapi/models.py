from django.db import models
from django.conf import settings
from django.contrib import auth
from django.utils.timezone import now
from django.utils import timezone
import json
from django.db.models.signals import post_save


# Create your models here.


class Video(models.Model):
    video_title = models.CharField(default="No Title", max_length=264)
    thumbnail_url = models.URLField(max_length=200, unique=True)
    publishing_date = models.DateTimeField(default=timezone.now)
    description = models.CharField(default="No Description", max_length=500, null=True, blank=True)
    