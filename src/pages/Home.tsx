import React from 'react';
import Box from '@mui/material/Box'
import { styled } from "@mui/material/styles";
import Header from './../components/Header'
import VideoList from './../components/VideoList'

export default function Home() {
  const HomeContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "#1A2027",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 5,
  }));

  return (
    <>
      <Header />
      <HomeContainer maxWidth={960} width="100%">
        <VideoList />
      </HomeContainer>
    </>
  )
}