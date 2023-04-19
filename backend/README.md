# The DJ-Studio Backend

The DJ-Studio backend is responsible for handling requests from the frontend and interacting with the YouTube API to fetch video information.


## Technologies

The DJ-Studio backend uses the following technologies:

- Django
- User Authentication with djoser
- SQLite

## YouTube API

The backend of the DJ-Studio uses the YouTube API to fetch video information. To use the YouTube API, you will need to create an API key from the official website: https://developers.google.com/youtube/v3/getting-started

Once you have created your API key, you will need to add it to the Django utils file (`utils.py`)
- YOUTUBE_KEY_API = 'YOUR_YOUTUBE_KEY_API'


## Endpoints

The following endpoints are available in the backend:

- `/videos/`: This endpoint allows users to fetch information about YouTube videos. It receives a list of video IDs in the request body and returns a JSON response containing details about each video.
- `/download-video/`: This endpoint allows users to download a YouTube video in MP4 format. It receives a video ID in the request body and returns the video file as a binary response.
- `/download-mp3/`: This endpoint allows users to download the audio track of a YouTube video in MP3 format. It receives a video ID in the request body and returns the audio file as a binary response.
- `/download-from-file/`: This endpoint allows users to download a video or audio file from their local device. It receives a file path in the request body and returns the file as a binary response.
- `/playlist/`: This endpoint allows users to fetch a list of videos that have been added to their playlist. It requires authentication and returns a JSON response containing details about each video. in the request body.
- `/add-to-playlist/`: This endpoint allows users to add a video to their playlist. It requires authentication and receives a video ID in the request body. It returns a JSON response containing a success message.
- `/delete-from-playlist/`: This endpoint allows users to delete a video from their playlist. It requires authentication and receives a video ID in the request body. It returns a JSON response containing a success message.
- `/contact/`:This endpoint allows users to send a contact message to the site administrator. It receives the user's name, email address, and message in the request body and sends an email to the administrator. It returns a JSON response containing a success message.

## Running the Backend

To run the backend, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project and install the dependencies.
-- cd backend
-- pip install -r requirements.txt
3. Add your API KEY to the Django utils file (`utils.py`)
-- YOUTUBE_KEY_API = 'YOUR_YOUTUBE_KEY_API'
4. Run the following command to start the backend.
-- python manage.py runserver 127.0.0.1:7000
5. The backend will now be running on `http://127.0.0.1:7000`.

## Contributing

Contributions to The Dj-Studio backend are welcome! If you have a bug to report or a feature to add, please create a pull request.

