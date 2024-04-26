import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import GitHubIcon from "@mui/icons-material/GitHub";

export default function AboutSite(props) {
  return (
    <Dialog open={props.isOpen} onClose={props.handleClose} scroll="paper">
      <DialogTitle>About This Site</DialogTitle>
      <DialogContent dividers={true}>
        <Typography gutterBottom>
          This site is made to translate streams in their entirety. Why a separate
          site instead of other alternatives like using YouTube's captioning
          function or making a clip? Very rarely do channels allow users to make
          captions for their streams, and making clips of full streams gets a little
          deep into the gray zone. With this, you can enjoy translated streams
          while also contributing to VOD views for the original channel.
        </Typography>
        <Typography gutterBottom>
          Can you use the translations on this site to make clips? Yes, please do so!
          Making clips that can best capture our oshi's charming moments is itself an art,
          and the goal is always to best promote them. The subtitle files are available 
          to download, so feel free to use them!
        </Typography> 
      </DialogContent>
      <DialogContent>
        More info can be found on the{" "}
        <Link
          underline="hover"
          href="https://github.com/BAUtran0/youtube_external_subtitle_browser"
        >
          GitHub Page <GitHubIcon fontSize="inherit" sx={{mr: "0.5em"}}/>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
