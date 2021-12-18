from apscheduler.schedulers.background import BackgroundScheduler
from searchapi.views import VideoAPIView

def start():
  scheduler = BackgroundScheduler()
  video = VideoAPIView()
  scheduler.add_job(video.save_youtube_data, "interval", seconds=10,id="video_001",replace_existing=True)
  scheduler.start()