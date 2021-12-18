from django.conf import settings
import requests
from .models import *
from .serializers import VideoSerializer
from rest_framework.generics import ListAPIView
from rest_framework import filters

"""
Created VideoAPIView
It is a ListAPIView which returns the list of video objects
containing video title, description, publishing date and thumbnail url

"""

class VideoAPIView(ListAPIView):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()

    # created an api key index which is used to refer to api key from the list of apikeys stored in settings
    api_key_index = 0

    # returns queryset sorted by descending order of publishing date
    def get_queryset(self):
        return self.queryset.order_by('-publishing_date')

    # this function fetches the data from youtube api
    def _get_youtube_data(self):
        youtube_api_url = "https://www.googleapis.com/youtube/v3/search"

        params = {
            'part': 'snippet',
            'q': 'disney',
            'type': 'video',
            'order': 'date',
            'publishedAfter': '2020-01-01T00:00:00Z',
            'maxResults':15,
            'key':settings.YOUTUBE_DATA_API_KEY[self.api_key_index] # provinding the api key at a specified index
        }
        response = requests.get(youtube_api_url, params=params)

        try:
            response.raise_for_status()
            return response.json()
        except:
            # if the quota gets exceeded from one api key it switches to next api key
            if response.json()["error"]["errors"][0]["reason"] == "quotaExceeded": 
                print(response.json()["error"]["errors"][0]["reason"])
                print("quota exceeded changing the api key")
                self.api_key_index = (self.api_key_index+1)%len(settings.YOUTUBE_DATA_API_KEY)
                # return self._get_youtube_data()
            else:
                return None

    # this function takes the video title, description and other parameters from the fetched youtube api and saves the objects in the serializer  
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
