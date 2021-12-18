from asyncio.windows_events import NULL
from django.conf import settings
from django.http import response
import requests
from .models import *
from .serializers import VideoSerializer
from rest_framework.generics import ListAPIView
import asyncio
from apscheduler.schedulers.background import BackgroundScheduler
from rest_framework import filters



class VideoAPIView(ListAPIView):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()
    api_key_index = 0

    
    def get_queryset(self):
        return self.queryset.order_by('-publishing_date')

    def _get_youtube_data(self):
        youtube_api_url = "https://www.googleapis.com/youtube/v3/search"

        params = {
            'part': 'snippet',
            'q': 'disney',
            'type': 'video',
            'order': 'date',
            'publishedAfter': '2020-01-01T00:00:00Z',
            'maxResults':15,
            'key':settings.YOUTUBE_DATA_API_KEY[self.api_key_index]
        }
        response = requests.get(youtube_api_url, params=params)

        try:
            response.raise_for_status()
            return response.json()
        except:
            if response.json()["error"]["errors"][0]["reason"] == "quotaExceeded":
                print(response.json()["error"]["errors"][0]["reason"])
                print("quota exceeded changing the api key")
                self.api_key_index = (self.api_key_index+1)%len(settings.YOUTUBE_DATA_API_KEY)
                # return self._get_youtube_data()
            else:
                return None

        
    def save_youtube_data(self):
        youtube_data = self._get_youtube_data()
        print(youtube_data)
        if youtube_data is not None:
            try:
                items = youtube_data["items"]
                for item in items:
                    item_dict = item["snippet"]
                    publishing_date = item_dict['publishedAt']
                    video_title = item_dict['title']
                    description = item_dict['description']
                    thumbnail_url = item_dict['thumbnails']['medium']['url']

                    data = {'publishing_date': publishing_date, 'video_title': video_title,
                            'description': description, 'thumbnail_url': thumbnail_url}
                    serializer = VideoSerializer(data=data)
                    if serializer.is_valid():
                        serializer.save()
            except:
                pass


class VideoOrderAPIView(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['publishing_date', 'video_title']
    def get_queryset(self):
        return self.queryset
        



class VideoFilterAPIView(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['video_title','description']
    def get_queryset(self):
        return self.queryset
