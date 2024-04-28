import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DownloadIcon from "@mui/icons-material/Download";
import FormControl from "@mui/material/FormControl";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Grid from "@mui/material/Unstable_Grid2";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Tooltip from '@mui/material/Tooltip';
import WidthWideOutlinedIcon from "@mui/icons-material/WidthWideOutlined";
import parser from "subtitles-parser";
import screenfull from "screenfull";

import { API_BASE_URL } from './../constants'
import Header from './../components/Header'
import AboutVersioning from './../components/AboutVersioning'
import youtubeExternalSubtitle from "../external/youtube.external.subtitle";

const Navi = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function VideoBrowser() {
  const params = useParams();
  let [isVersioningModalOpen, setIsVersioningModalOpen] = useState(false)
  let [availableSubtitles, setAvailableSubtitles] = useState([]);
  let [currentSubtitleFile, setCurrentSubtitleFile] = useState("");
  let [title, setTitle] = useState("Loading...");
  let [isWidescreen, setIsWidescreen] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const YOUTUBE_VIDEO_PLAYER_DEFAULT_TITLE = "YouTube video player";

  function formatSRT(srtData) {
    let subtitles = parser.fromSrt(srtData, true);
    for (var ii in subtitles) {
      subtitles[ii] = {
        start: subtitles[ii].startTime / 1000,
        end: subtitles[ii].endTime / 1000,
        text: subtitles[ii].text,
      };
    }
    return subtitles;
  }

  const handleClickAboutVersioning = () => {
    setIsVersioningModalOpen(true)
  }

  const handleCloseVersioningModal = () => {
    setIsVersioningModalOpen(false)
  }

  const handleChangeSubtitleVersion = (event: SelectChangeEvent) => {
    setCurrentSubtitleFile(event.target.value);
  };

  const handleClickWidescreen = () => {
    setIsWidescreen(!isWidescreen);
  };

  const handleClickFullscreen = () => {
    screenfull.request(containerRef.current);
  };

  const prettifyVersionName = (subtitleFilename: string) => {
    let prettyName = subtitleFilename.replaceAll(".srt", "");
    prettyName = prettyName.replaceAll("_", ".");
    return prettyName;
  };

  useEffect(() => {
    // Poll for the title until the YouTube player finishes loading
    const getTitleInterval = setInterval(() => {
      if (videoRef.current.title != YOUTUBE_VIDEO_PLAYER_DEFAULT_TITLE) {
        setTitle(videoRef.current.title);
        clearInterval(getTitleInterval);
      }
    }, 300);
  }, []);

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/api/get_available_subtitles?video_id=${params.videoId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAvailableSubtitles(data.available_subtitles);
        setCurrentSubtitleFile(data.available_subtitles[0]);
      });
  }, []);

  useEffect(() => {
    if (currentSubtitleFile == "") {
      return;
    }
    fetch(
      `${API_BASE_URL}/static/subtitles/${params.videoId}/${currentSubtitleFile}`
    )
      .then((response) => response.text())
      .then((data) => {
        if (videoRef?.current?.youtubeExternalSubtitle == undefined) {
          new youtubeExternalSubtitle.Subtitle(
            document.getElementById("video"),
            formatSRT(data)
          );
        } else {
          videoRef.current.youtubeExternalSubtitle.load(formatSRT(data));
        }
      });
  }, [currentSubtitleFile]);

  return (
    <>
      <Header />
      <Box width="100%" maxWidth={isWidescreen ? null : "960px"}>
        <div
          style={
            isWidescreen
              ? { width: "100%", height: "95vh" }
              : { width: "100%", height: "560px" }
          }
          ref={containerRef}
        >
          <iframe
            ref={videoRef}
            id="video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${params.videoId}`}
            title={YOUTUBE_VIDEO_PLAYER_DEFAULT_TITLE}
            frameBorder="0"
            allow="web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={false}
          ></iframe>
        </div>
        <Navi>
          <Grid container alignItems="center" rowSpacing={1}>
            <Grid xs={12} />
            <Grid xs={12}>
              <Typography variant="h5">{title}</Typography>
            </Grid>
            <Grid xs={12} />
            <Grid xs={4}>
              <FormControl fullWidth>
                <InputLabel>Subtitle Version</InputLabel>
                <Select
                  value={currentSubtitleFile}
                  label="Subtitle Version"
                  onChange={handleChangeSubtitleVersion}
                >
                  {availableSubtitles.map((availableSubtitle) => (
                    <MenuItem value={availableSubtitle} id={availableSubtitle}>
                      {prettifyVersionName(availableSubtitle)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={1}>
              <Tooltip title="About Versioning">
                <Button sx={{ marginLeft: "-2.5em", width: 0, minWidth: 0 }} variant="outlined secondary" onClick={handleClickAboutVersioning}>
                  <HelpOutlineOutlinedIcon
                    fontSize="small"
                    sx={{ height: "100%" }}
                  />
                </Button>
              </Tooltip>
            </Grid>
            <Grid xs={3}></Grid>
            <Grid xs={4}>
              <ButtonGroup>
                <Button
                  variant="outlined secondary"
                  onClick={handleClickWidescreen}
                >
                  Widescreen{" "}
                  <WidthWideOutlinedIcon
                    fontSize="large"
                    sx={{ paddingLeft: "0.2em", height: "100%" }}
                  />
                </Button>
                <Button
                  variant="outlined secondary"
                  onClick={handleClickFullscreen}
                >
                  Fullscreen{" "}
                  <FullscreenIcon
                    fontSize="large"
                    sx={{ paddingLeft: "0.2em", height: "100%" }}
                  />
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid xs={1}>
              <a
                href={`${API_BASE_URL}/static/subtitles/${params.videoId}/${currentSubtitleFile}`}
              >
                <Tooltip title="Download Subtitles">
                  <Button variant="outlined">
                    Download{" "}
                    <DownloadIcon fontSize="large" sx={{ height: "100%" }} />
                  </Button>
                </Tooltip>
              </a>
            </Grid>
          </Grid>
        </Navi>
      </Box>
      <AboutVersioning isOpen={isVersioningModalOpen} handleClose={handleCloseVersioningModal} />
    </>
  );
}
