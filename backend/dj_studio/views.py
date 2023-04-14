from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from .utils import *


@api_view(['POST'])
def rest_fetch_videos_from_yt(request):
	uat_data = tiesto
	uat_data = None
	if request.method == 'POST':
		query = request.data['query']
		print(f'# Started rest_fetch_videos_from_yt: {query} {"="*50}')
		videos = fetch_videos_from_yt(query=query, uat_data=uat_data)
		if not videos:
			videos = fetch_videos(query=query, uat_data=uat_data)
		print(f'# Finished rest_fetch_videos_from_yt: {query} {"="*50}')
	return Response(videos, status=200)

@api_view(['POST'])
def rest_download_video(request):
	if request.method == 'POST':
		video_id = request.data['video_id']
		print(f'# Started rest_download_video: {video_id} {"="*50}')
		status = download_video(video_id)
		print(f'# Finished rest_download_video: {video_id} {"="*50}')
	return Response(status, status=200)

@api_view(['POST'])
def rest_download_mp3(request):
	if request.method == 'POST':
		video_id = request.data['video_id']
		print(f'# Started rest_download_mp3: {video_id} {"="*50}')
		status = download_mp3(video_id)
		print(f'# Finished rest_download_mp3: {video_id} {"="*50}')
	return Response(status, status=200)

@api_view(['POST'])
def rest_download_from_file(request):
	print(request.__dict__)
	return Response(True, status=200)

@api_view(['POST'])
def rest_fetch_playlist(request):
	if request.method == 'POST':
		user_email = request.data['user_email']
		print(f'# Started rest_fetch_playlist: {user_email} {"="*50}')
		playlist = fetch_playlist(user_email)
		print(f'# Finished rest_fetch_playlist: {user_email} {"="*50}')
		return Response(playlist, status=200)

@api_view(['POST'])
def rest_add_to_playlist(request):
	if request.method == 'POST':
		video = request.data['video']
		print(f'# Started rest_add_to_playlist: {video} {"="*50}')
		status = add_to_playlist(video)
		playlist = fetch_playlist(video['user_email'])
		print(f'# Finished rest_add_to_playlist: {video} {"="*50}')
	return Response(playlist, status=200) 

@api_view(['POST'])
def rest_delete_from_playlist(request):
	if request.method == 'POST':
		video = request.data['video']
		video_id = video['video_id']
		user_email = video['user_email']
		print(f'# Started rest_delete_from_playlist: {video_id, user_email} {"="*50}')
		status = delete_from_playlist(video_id, user_email)
		playlist = fetch_playlist(user_email)
		print(f'# Finished rest_delete_from_playlist: {video_id, user_email} {"="*50}')
	return Response(playlist, status=200)

@api_view(['POST'])
def rest_save_contact_message(request):
	if request.method=='POST':
		contact_email = request.data['contact_email']
		user_message = request.data['user_message']
		contact_date = request.data['contact_date']
		print(f'# Started rest_save_contact_message: {contact_email} {"="*50}')
		status = save_contact_message(contact_email, user_message, contact_date)
		print(f'# Finished rest_save_contact_message: {contact_email} {"="*50}')
	return Response(status, status=200)