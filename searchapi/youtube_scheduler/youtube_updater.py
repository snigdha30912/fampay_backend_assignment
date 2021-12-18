from apscheduler.schedulers.background import BackgroundScheduler
from searchapi.views import VideoAPIView

"""
We did scheduling so that the data is fetched from the youtube api every 10 seconds. 
This function runs in beckground (async). We installed APScheduler library and used 
BackgroundScheduler to implement the fetching of youtube api data in the background.

"""

def start():
  scheduler = BackgroundScheduler()
  video = VideoAPIView()
  scheduler.add_job(video.save_youtube_data, "interval", seconds=10,id="video_001",replace_existing=True)
  scheduler.start()