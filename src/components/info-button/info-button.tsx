import { Box, IconButton, Popover, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";

interface InfoButtonProps {
  title: string;
  description: string;
}

export function InfoButton(props: InfoButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <React.Fragment>
      <IconButton aria-describedby={id} size="small" onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: "500px" },
        }}
      >
        <Box padding={1}>
          <Typography variant="h6">{props.title}</Typography>
          <Typography>{props.description}</Typography>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
