from django.apps import AppConfig


class SearchapiConfig(AppConfig):
    name = 'searchapi'

    # starting the scheduler at the starting of the application
    def ready(self):
        from .youtube_scheduler import youtube_updater
        youtube_updater.start()