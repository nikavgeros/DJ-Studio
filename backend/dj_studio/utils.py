
import requests
import pandas as pd
from pytube import YouTube, Search
import os
from pathlib import Path
from .serializers import *

# Youtube credentials
YOUTUBE_KEY_API = 'YOUR_YOUTUBE_KEY_API'

# Setting url for videos and searching list
SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
VIDEOS_URL = 'https://www.googleapis.com/youtube/v3/videos'

# Find users downloads path
DOWNLOAD_PATH = str(Path.home() / 'Downloads')
ABSOLUTE_PATH = None #str(Path.absolute())

# SEARCH PARAMETERS
search_params = {
    'key': YOUTUBE_KEY_API,
    'q': '', # request.form.get('query')
    'part': 'snippet',
    'maxResults': 9,
    'type': 'video'
}

# VIDEO PARAMETERS
video_params = {
    'key': YOUTUBE_KEY_API,
    'id': '', #','.join(video_ids),
    'part': 'snippet,contentDetails',
    'maxResults': 9
}

# Videos for testing
tiesto = [
	{'video_id': 'nCg3ufihKyU', 'title': 'Tiësto - The Business (Official Music Video)', 'url': 'https://youtube.com/watch?v=nCg3ufihKyU', 'thumbnail': 'https://i.ytimg.com/vi/nCg3ufihKyU/sddefault.jpg?v=5f6cc459'},
	{'video_id': 'taSubkjZUA4', 'title': "Tiësto & Karol G - Don't Be Shy (Official Music Video)", 'url': 'https://youtube.com/watch?v=taSubkjZUA4', 'thumbnail': 'https://i.ytimg.com/vi/taSubkjZUA4/sddefault.jpg?v=61151971'},
	{'video_id': '1_4ELAxKrDc', 'title': 'Tiësto & Ava Max - The Motto (Official Music Video)', 'url': 'https://youtube.com/watch?v=1_4ELAxKrDc', 'thumbnail': 'https://i.ytimg.com/vi/1_4ELAxKrDc/sddefault.jpg?v=6183096b'}, 
	{'video_id': '8R_4O3q92Lo', 'title': 'Tiësto - Live from Edge New York City', 'url': 'https://youtube.com/watch?v=8R_4O3q92Lo', 'thumbnail': 'https://i.ytimg.com/vi/8R_4O3q92Lo/sddefault.jpg'},
	{'video_id': 'O1M2Dh94gMU', 'title': 'CLUBLIFE by Tiësto Episode 804', 'url': 'https://youtube.com/watch?v=O1M2Dh94gMU', 'thumbnail': 'https://i.ytimg.com/vi/O1M2Dh94gMU/hqdefault.jpg'}, 
	{'video_id': 'r0bhF7SJLYQ', 'title': 'Tiësto & Charli XCX - Hot In It [Official Music Video]', 'url': 'https://youtube.com/watch?v=r0bhF7SJLYQ', 'thumbnail': 'https://i.ytimg.com/vi/r0bhF7SJLYQ/sddefault.jpg?v=62f5cd4d'}, 
	{'video_id': 'nK-7S9HzFjo', 'title': 'TIËSTO MEGAMIX 2022 - Best Songs Of All Time', 'url': 'https://youtube.com/watch?v=nK-7S9HzFjo', 'thumbnail': 'https://i.ytimg.com/vi/nK-7S9HzFjo/sddefault.jpg'}, 
	{'video_id': 'JqUqyUEwTMY', 'title': 'Tiësto - In Search Of Sunrise 4: Latin America CD1', 'url': 'https://youtube.com/watch?v=JqUqyUEwTMY', 'thumbnail': 'https://i.ytimg.com/vi/JqUqyUEwTMY/sddefault.jpg'}, 
	{'video_id': 'kjdOBYTUOzY', 'title': 'TIËSTO @ 15 Years of Tomorrowland 2019 [full set]', 'url': 'https://youtube.com/watch?v=kjdOBYTUOzY', 'thumbnail': 'https://i.ytimg.com/vi/kjdOBYTUOzY/sddefault.jpg?v=5e2216ce'}, 
	{'video_id': 'ontU9cOg354', 'title': 'Tiësto, Jonas Blue & Rita Ora - Ritual (Official Video)', 'url': 'https://youtube.com/watch?v=ontU9cOg354', 'thumbnail': 'https://i.ytimg.com/vi/ontU9cOg354/sddefault.jpg?v=5d0183d9'}, 
	{'video_id': 'e94gack-DJk', 'title': 'Tiësto - Live @ Ultra Music Festival 2022', 'url': 'https://youtube.com/watch?v=e94gack-DJk', 'thumbnail': 'https://i.ytimg.com/vi/e94gack-DJk/sddefault.jpg'},
	{'video_id': 'LqCcdtM7Qe4', 'title': 'Tiesto - Silence - Delerium featuring Sarah McLachlan', 'url': 'https://youtube.com/watch?v=LqCcdtM7Qe4', 'thumbnail': 'https://i.ytimg.com/vi/LqCcdtM7Qe4/hqdefault.jpg'}, 
	{'video_id': 'b3mOLJvbBwQ', 'title': 'Tiësto feat. Nelly Furtado - Who Wants To Be Alone', 'url': 'https://youtube.com/watch?v=b3mOLJvbBwQ', 'thumbnail': 'https://i.ytimg.com/vi/b3mOLJvbBwQ/hqdefault.jpg'}, 
	{'video_id': 'VlWOFJJIo9Y', 'title': 'DJ Tiesto - Insomnia', 'url': 'https://youtube.com/watch?v=VlWOFJJIo9Y', 'thumbnail': 'https://i.ytimg.com/vi/VlWOFJJIo9Y/hqdefault.jpg'}, 
	{'video_id': 'Dr1nN__-2Po', 'title': 'Tiësto & KSHMR feat. Vassy - Secrets (Official Music Video)', 'url': 'https://youtube.com/watch?v=Dr1nN__-2Po', 'thumbnail': 'https://i.ytimg.com/vi/Dr1nN__-2Po/sddefault.jpg'}, 
	{'video_id': '2EaE0_gQLw0', 'title': 'Tiësto - Adagio For Strings', 'url': 'https://youtube.com/watch?v=2EaE0_gQLw0', 'thumbnail': 'https://i.ytimg.com/vi/2EaE0_gQLw0/hqdefault.jpg'}, 
	{'video_id': '8tIgN7eICn4', 'title': 'DJ Tiesto - Adagio For Strings', 'url': 'https://youtube.com/watch?v=8tIgN7eICn4', 'thumbnail': 'https://i.ytimg.com/vi/8tIgN7eICn4/hqdefault.jpg'}, 
	{'video_id': '-qgzNwdkV4s', 'title': 'Dj Tiesto - Traffic!', 'url': 'https://youtube.com/watch?v=-qgzNwdkV4s', 'thumbnail': 'https://i.ytimg.com/vi/-qgzNwdkV4s/hqdefault.jpg'}, 
	{'video_id': 'Jbh3GlrRcQ4', 'title': 'Tiësto ft. BT - Love Comes Again (Official Video)', 'url': 'https://youtube.com/watch?v=Jbh3GlrRcQ4', 'thumbnail': 'https://i.ytimg.com/vi/Jbh3GlrRcQ4/sddefault.jpg'}
]


# Main functions
def fetch_videos_from_yt(query, uat_data=None):
	if uat_data:
		return uat_data
	videos = []
	video_ids = []
	search_params['q'] = query
	video_params['q'] = query
	try:
		requests.get(SEARCH_URL, params=search_params)
		search_response = requests.json()['items']
		for item in search_response:
			video_ids.append(item['id']['videoId'])
	except:
		print(f'Connection Error')
	if video_ids:
		requests.get(VIDEOS_URL, params=video_params)
		video_response = requests.json()['items']
		for video in video_response:
			video_data = {
                'video_id': video['id'],
                'url': f'https://www.youtube.com/watch?v={video["id"]}',
                'thumbnail': video['snippet']['thumbnails']['high']['url'],
                'title': video['snippet']['title']
            }
			videos.append(video_data)
	return videos


def fetch_videos(query, uat_data=None):
	if uat_data:
		return uat_data
	else:
		videos = []
		search = Search(query)
		for result in search.results:
			video = {}
			video['video_id'] = result.video_id
			video['title'] = result.title
			video['url'] = result.watch_url
			video['thumbnail'] = YouTube(result.watch_url).thumbnail_url
			videos.append(video)
		return videos


def create_folders(video:bool=True):
	path_to_file = DOWNLOAD_PATH + '/DJStudio'
	file_exists = os.path.exists(path_to_file)
	if not file_exists:
		os.mkdir(path_to_file)
		print(f'Created path: {path_to_file}', end='\n')
	if video:
		path_to_file = DOWNLOAD_PATH + '/DJStudio/VIDEO'
		file_exists = os.path.exists(path_to_file)
		if not file_exists:
			os.mkdir(path_to_file)
			print(f'Created path: {path_to_file}', end='\n')
	else:
		path_to_file = DOWNLOAD_PATH + '/DJStudio/MP3'
		file_exists = os.path.exists(path_to_file)
		if not file_exists:
			os.mkdir(path_to_file)
			print(f'Created path: {path_to_file}', end='\n')
	return path_to_file


def download_video(video_id):
	status = 'pending'
	path_to_file = create_folders(video=True)
	link=f"https://www.youtube.com/watch?v={video_id}"
	try: 
		yt = YouTube(link) 
	except: 
		print("Connection Error") 
	try:
		yt.streams.filter(progressive=True, file_extension="mp4").first().download(output_path=path_to_file)
		status = 'approved'
	except:
		print("Some Error!")
		status = 'rejected'
	return status


def download_mp3(video_id):
	status = 'pending'
	video = f'https://www.youtube.com/watch?v={video_id}'
	path_to_file = create_folders(video=False)
	try:
		audio_title = YouTube(video).title
		audio_mp4 = YouTube(video).streams.filter(only_audio=True).first().download(output_path=path_to_file)
		log = f' Downloaded: {audio_title}'
		status = 'approved'
	except:
		log = f'Error: {audio_title}'
		status = 'rejected'
	try :
		base, ext = os.path.splitext(audio_mp4)
		to_mp3 = base + '.mp3'
		os.rename(audio_mp4, to_mp3)
	except FileExistsError:
		os.remove(to_mp3)
		os.rename(audio_mp4, to_mp3)
		log = log.replace('Downloaded', 'Already exists')
	return status


def download_mp3_from_file(file):
	df_videos = pd.read_excel(file)
	column = df_videos.columns[0]
	videos = df_videos[column].str.strip().tolist()
	path_to_file = create_folders(video=False)
	logs = []
	for idx, video in enumerate(iterable=videos, start=1):
		try:
			audio_title = YouTube(video).title
			audio_mp4 = YouTube(video).streams.filter(only_audio=True).first().download(output_path=path_to_file)
			log = [idx, 'Downloaded', audio_title]
		except:
			log = [idx, 'Error', audio_title]
		try :
			base, ext = os.path.splitext(audio_mp4)
			to_mp3 = base + '.mp3'
			os.rename(audio_mp4, to_mp3)
		except FileExistsError:
			os.remove(to_mp3)
			os.rename(audio_mp4, to_mp3)
			log[1] = 'Already exists'
		print(log[0], log[1], log[2])
		logs.append(log)
	return logs

def fetch_playlist(user_email):
	user_playlist = Playlist.objects.all().filter(user_email=user_email)
	playlist_serializer = PlaylistSerializer(user_playlist, many=True)
	print('fetch_playlist: ', playlist_serializer.data)
	return playlist_serializer.data

def add_to_playlist(video):
	status = 'pending'
	playlist_serializer = PlaylistSerializer(data=video)
	if playlist_serializer.is_valid():
		playlist_serializer.save()
		status = 'approved'
	else:
		status = 'rejected'
	return status

def delete_from_playlist(video_id, user_email):
	status='pending'
	try:
		record = Playlist.objects.all().filter(video_id=video_id, user_email=user_email)
		record.delete()
		status = 'approved'
	except Exception as e:
		print(e)
		status = 'rejected'
	return status

def save_contact_message(contact_email, user_message, contact_date):
	status = 'pending'
	contact_serializer = ContactSerializer(contact_email=contact_email, user_message=user_message, contact_date=contact_date)
	if contact_serializer.is_valid():
		contact_serializer.save()
		status = 'approved'
	else:
		status = 'rejected'
	return status
