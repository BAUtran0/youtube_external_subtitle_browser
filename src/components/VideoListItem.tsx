import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Paper from '@mui/material/Paper'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack'
import { API_BASE_URL } from './../constants'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1A2027',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: "background 0.3s",
  ':hover': {
    backgroundColor: '#39414a'
  }
}));

export default function VideoListItem(props) {
  let [thumbnailImage, setThumbnailImage] = useState()

  const navigate = useNavigate()
  const handleOnClick = () => navigate(`/video/${props.videoId}`)

  useEffect(() => {
    fetch(`${API_BASE_URL}/static/thumbnails/${props.videoId}.jpg`)
    .then(response => response.blob())
    .then(data => setThumbnailImage(URL.createObjectURL(data)))
  }, [])

  return (
    <Item onClick={handleOnClick} sx={{cursor: "pointer", paddingTop: "1em"}}>
      <ListItem>
        <ListItemIcon>
          <img style={{maxHeight: "10vh"}} src={thumbnailImage} />
        </ListItemIcon>
        <Stack>
          <ListItemText sx={{paddingLeft: "2em"}}><Typography variant="h5">{props.name}</Typography></ListItemText>
          <span style={{textAlign: "right"}}>{dayjs.unix(props.createdTimestamp).format("YYYY-MM-DD")}</span>
        </Stack>
      </ListItem>
    </Item>
  )
}