from django.db import models
from django.utils.timezone import now
from django.utils import timezone


"""
Created Video Model 
Created fields like Video title, Thumbnail URL, Publishing Date and Description

"""

class Video(models.Model):
    video_title = models.CharField(default="No Title", max_length=264)
    thumbnail_url = models.URLField(max_length=200, unique=True)
    publishing_date = models.DateTimeField(default=timezone.now)
    description = models.CharField(default="No Description", max_length=500, null=True, blank=True)
    