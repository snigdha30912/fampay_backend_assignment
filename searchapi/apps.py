from django.apps import AppConfig


class SearchapiConfig(AppConfig):
    name = 'searchapi'

    def ready(self):
        print("Starting Scheduler ...")
        from .youtube_scheduler import youtube_updater
        youtube_updater.start()