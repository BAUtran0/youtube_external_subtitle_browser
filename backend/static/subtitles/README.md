Subtitles go in this directory. The path should be
`./static/subtitles/<videoId>/<version>.srt`

Example:
`./static/subtitles/abc123def456/v1_0_0.srt`

You can also add a file containing credits for a specific video.
Put that in a `credits.yaml` file in a subtitle video directory
`./static/subtitles/<videoId>/credits.yaml`

The contents of credits.yaml should look like:
`
- name: Foo
  twitter_username: foo123
`