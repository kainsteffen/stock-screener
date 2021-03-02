import { Box, IconButton, Link, Popover, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";

interface InfoButtonProps {
  title: string;
  description: string;
  url: string;
}

export function InfoButton(props: InfoButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
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
        onClick={(event: any) => event.stopPropagation()}
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
        <Box padding={2}>
          <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Typography variant="h6">{props.title}</Typography>
            <IconButton
              aria-describedby={id}
              size="small"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography gutterBottom>{props.description}</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Link target="_blank" href={props.url}>
              More Information
            </Link>
          </Box>
        </Box>
      </Popover>
    </React.Fragment>
  );
}
