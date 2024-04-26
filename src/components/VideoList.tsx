import Stack from '@mui/material/Stack';
import React, {useState, useEffect} from 'react';
import VideoListItem from './VideoListItem'
import { API_BASE_URL } from './../constants'


export default function VideoList() {
  let [streamList, setStreamList] = useState([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/get_stream_list`)
    .then(response => response.json())
    .then(data => setStreamList(data.stream_list))
  }, [])

  return (
    <Stack width="100%">
      {streamList.map((stream, _) => {
        return (<VideoListItem
          key={stream.video_id}
          name={stream.name}
          videoId={stream.video_id}
          createdTimestamp={stream.created_timestamp}
        />)
      })}
    </Stack>
  )
}