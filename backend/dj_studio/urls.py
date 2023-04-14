
from django.urls import path, include
from .views import *
from .admin import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('videos/', rest_fetch_videos_from_yt),
    path('download-video/', rest_download_video),
    path('download-mp3/', rest_download_mp3),
    path('download-from-file/', rest_download_from_file),
    path('playlist/', rest_fetch_playlist),
    path('add-to-playlist/', rest_add_to_playlist),
    path('delete-from-playlist/', rest_delete_from_playlist),
    path('contact/', rest_save_contact_message),
]