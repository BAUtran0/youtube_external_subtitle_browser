import os
from pathlib import Path
from functools import lru_cache

from werkzeug.utils import secure_filename
from flask import send_file
from flask import send_from_directory
from flask import Flask
from flask import request
from flask_cors import CORS
import yaml

api = Flask(__name__)
CORS(api, resources={r'/api/*': {'origins': '*'}})
CORS(api, resources={r'/static/*': {'origins': '*'}})


@lru_cache(maxsize=1)
def read_stream_list_file():
    with open('stream_list.yaml', 'r') as fh:
        stream_list = yaml.safe_load(fh)
    return stream_list

@api.route('/api/get_stream_list')
def get_stream_list():
    stream_list = read_stream_list_file()
    response_body = {
        'stream_list': sorted(
            stream_list,
            key=lambda x: x['created_timestamp'],
            reverse=True,
        ),
    }
    return response_body

def version_sort_key_func(srt_filename):
    srt_filename = srt_filename.strip('v')
    srt_filename = srt_filename.split('.')[0]
    return list(map(int, srt_filename.split('_')))

@api.route('/api/get_available_subtitles')
def get_available_subtitles():
    video_id = request.args.get('video_id')
    subtitles_dir = Path(f'static/subtitles/{video_id}')
    available_subtitles = os.listdir(subtitles_dir)
    available_subtitles = list(filter(lambda x: x != 'credits.yaml', available_subtitles))
    available_subtitles.sort(key=version_sort_key_func, reverse=True)
    return {
      'available_subtitles': available_subtitles,
    }

@api.route('/api/get_subtitle_credits')
def get_subtitle_credits():
    video_id = request.args.get('video_id')
    subtitles_dir = Path(f'static/subtitles/{video_id}')
    subtitle_credits = []
    if subtitles_dir.joinpath('credits.yaml').is_file():
        with open(subtitles_dir.joinpath('credits.yaml'), 'r') as fh:
            subtitle_credits = yaml.safe_load(fh)
    return {
      'subtitle_credits': subtitle_credits,
    }

# Serve frontend bundles for any of the React routes. This is dumb but lets us serve the 
# frontend from flask so you don't need a reverse proxy in order to serve both a react
# app and a flask app on one domain
@api.route('/')
def serve_index_html():
    return send_file("../dist/index.html")

@api.route('/<path:filename>')
def serve_js_bundles(filename):
    return send_from_directory("../dist", secure_filename(filename))

@api.route('/video/<path:video_id>')
def serve_(video_id):
    return send_file("../dist/index.html")