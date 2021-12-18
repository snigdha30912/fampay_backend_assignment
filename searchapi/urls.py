from django.contrib.auth import views as auth_views
from . import views
from .views import *
from django.urls import path

app_name = 'searchapi'

"""
Created urls for all the views.

"""

urlpatterns = [
    path('searchApi/', views.VideoAPIView.as_view()),
    path('order/', views.VideoOrderAPIView.as_view()),
    path('search/', views.VideoFilterAPIView.as_view()),
]
