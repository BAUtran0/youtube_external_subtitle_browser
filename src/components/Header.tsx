import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button'
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AboutSite from './AboutSite';
import logo from './../logo.gif'

export default function Header() {
  const [isAboutSiteModalOpen, setIsAboutSiteModalOpen] = useState(false)

  const renderVideoBreadcrumbs = () => {
    const splitPath = window.location.pathname.split('/')
    if (splitPath.length == 3 && splitPath[1] == "video") {
      return (
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          href={`/video/${splitPath[2]}`}
        >
          <OndemandVideoIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Video Player ({`${splitPath[2]}`})
        </Link>
      )
    }
    return null
  }

  const handleClickAboutSite = () => {
    setIsAboutSiteModalOpen(true)
  }

  const handleOnCloseAboutSite = () => {
    setIsAboutSiteModalOpen(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
          <Box display="flex">
            <a href="/">
              <img
                src={logo}
                style={{
                  paddingRight: "1em",
                }}
              />
            </a>
            <Breadcrumbs>
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Home
              </Link>
              {renderVideoBreadcrumbs()}
            </Breadcrumbs>
          </Box>
          <Button onClick={handleClickAboutSite}>
            About
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <AboutSite isOpen={isAboutSiteModalOpen} handleClose={handleOnCloseAboutSite} />
    </>
  )
}