from rest_framework import serializers
from .models import Video

"""
Created Serializer class which takes in fields like
id, video title, thumbnail url, publishing date, and description

"""

class VideoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Video
        fields = ['id', 'video_title', 'thumbnail_url','publishing_date', 'description']