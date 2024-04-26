from flask import Flask
import yaml

api = Flask(__name__)


@api.route('/get_stream_list')
def get_stream_list():
    with open('stream_list.yaml', 'r') as fh:
        streams = yaml.safe_load(fh)
    response_body = {
        "stream_list": sorted(streams, key=lambda x: x['created_timestamp']),
    }
    return response_body