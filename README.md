<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />

  <h3 align="center">YouTube External Subtitle Browser</h3>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Ever wanted to make your own unofficial subtitles or translations for a YouTube video, but community subtitles weren't enabled and you didn't want to offset potential views to the channel owner with a "clip" that covers the whole stream? Then look no futher!

This is an interface to load an unofficial `.srt` subtitle file and overlay those subtitles over the original YouTube video. The overlay functionality depends completely on the wonderful work by siloor here https://github.com/siloor/youtube.external.subtitle.

All this webapp does is provide a neat browser and player. But it's time to put down Adobe Premiere and After Effects, and whip out Aegisub like the good old days.

You can see it running live at [https://bautl.aenbien.com](https://bautl.aenbien.com).


![Player](https://github.com/BAUtran0/youtube_external_subtitle_browser/assets/151094694/eb1328ad-afec-4b97-a03d-1cef21a17eda)


![Browser](https://github.com/BAUtran0/youtube_external_subtitle_browser/assets/151094694/22cafb55-802d-47ce-9589-a27d9c8ca3de)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

The app is composed of a React JS frontend and a Flask Python backend. The frontend and backend can be run separately for development purposes, but in production the Flask backend will be serving the generated minified js bundles.

### Prerequisites

Requires `npm` and `python-virtualenv`.

### Configuration

##### Adding new entries
1. Create a `backend/stream_list.yaml` file or copy and use `backend/stream_list.yaml.example` as a template.
2. For each video, you will need to add an entry to `stream_list.yaml`, each one requiring `name` for the video name, `video_id` for the YouTube video ID, and `created_timestamp` with the unix timestamp in seconds for when the stream has started.
3. Upload an image of the stream's thumbnail as a `.jpg` to `backend/static/<video_id>.jpg`. You can check the ![README.md](https://github.com/BAUtran0/youtube_external_subtitle_browser/blob/main/backend/static/thumbnails/README.md) in that directory.
4. Upload any `.srt` subtitle files to `backend/static/<video_id>/<version>.srt`. The subtitles need to follow the version conventions described ![here](https://github.com/BAUtran0/youtube_external_subtitle_browser/blob/main/src/components/AboutVersioning.tsx). You can check the ![README.md](https://github.com/BAUtran0/youtube_external_subtitle_browser/blob/main/backend/static/subtitles/README.md) in that directory.

##### Preparing for production
1. Create a `.env` file or copy and use `.env.example` as a template.
2. Set `API_BASE_URL` to be whatever the domain you want to serve the app on.
3. Set `PORT` to be whatever port you want to serve the site on.

### Installation

Setting up is very self explanatory upon looking in the `Makefile`. Just take a peek in the ![file](https://github.com/BAUtran0/youtube_external_subtitle_browser/blob/main/Makefile) to figure out how things work.

##### Running the dev backend

Run `make start_backend_dev`

##### Running the dev frontend

Run ` make start_frontend_dev`

##### Running in production

Run `make start_production`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [ ] Make things look nicer for I am not a designer
  - [ ] NEEED a pink and blue theme
- [ ] Make an interface for adding new entries instead of having to edit a yaml file and upload files by hand
- [ ] Add colored subs so they can match hair colors like we're back in 2008
- [ ] Actually add typing since those .tsx extensions are a lie
- [ ] Dockerize for portability
- [ ] Setup a real datastore since using yaml and filenames is silly
- [ ] Add testing (lol) (lmao)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

If you want to improve things in any way, feel free! Just fork and send a pull request.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Twitter: [@AndyTran10Sub](https://twitter.com/AndyTran10Sub)