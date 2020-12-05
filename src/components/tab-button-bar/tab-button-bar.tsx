import {
  Box,
  Button,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React, { useEffect, useRef, useState } from "react";
import "./tab-button-bar.css";
export interface TabButtonBarProps {
  options: string[];
}

const useStyles = makeStyles({
  scrollButton: {
    backgroundColor: "white",
    "&:hover": {
      background: "white",
    },
  },
});

export default function TabButtonBar(props: TabButtonBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  let scrollPos = 0;
  const classes = useStyles();
  const leftScrollButtonRef = useRef(null);
  const rightScrollButtonRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  let scrollWrapper;

  useEffect(() => {
    const leftScrollButton = (leftScrollButtonRef.current as unknown) as HTMLDivElement;
    const rightScrollButton = (rightScrollButtonRef.current as unknown) as HTMLDivElement;
    scrollWrapper = (scrollWrapperRef.current as unknown) as HTMLDivElement;
    scrollWrapper.addEventListener("onscroll", (scroll) => {
      console.log(scroll);
    });
  });

  return (
    <Box position="relative" marginBottom={2}>
      <div className="horizontal-scroll" ref={scrollWrapperRef}>
        {props.options.map((option, index) => {
          return (
            <Box key={index} display="flex" flex="0 0 auto" marginRight={1}>
              <Button
                color="primary"
                variant={selectedIndex === index ? "contained" : "outlined"}
                size="small"
                onClick={() => setSelectedIndex(index)}
              >
                <Typography noWrap>{option}</Typography>
              </Button>
            </Box>
          );
        })}
      </div>

      <Box
        display="flex"
        alignItems="center"
        height="100%"
        position="absolute"
        top="0"
        left="0"
      >
        <Box boxShadow={3} borderRadius="50%">
          <IconButton className={classes.scrollButton} size="small">
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        height="100%"
        position="absolute"
        top="0"
        right="0"
      >
        <Box boxShadow={3} borderRadius="50%">
          <IconButton className={classes.scrollButton} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
