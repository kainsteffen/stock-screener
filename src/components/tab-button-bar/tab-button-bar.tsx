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
  const [scrollPos, setScrollPos] = useState(0);

  const classes = useStyles();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  let maxScrollPos = 0;
  if (scrollWrapperRef.current) {
    maxScrollPos =
      scrollWrapperRef.current.scrollWidth -
      scrollWrapperRef.current.clientWidth;
  }
  useEffect(() => {
    scrollWrapperRef.current?.addEventListener("scroll", (e) => {
      if (e && e.target) {
        setScrollPos((e.target as HTMLDivElement).scrollLeft);
      }
    });
  });

  const scrollTo = (x: number, y: number) => {
    scrollWrapperRef.current?.scrollTo(x, y);
  };

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

      {scrollPos > 0 && (
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          position="absolute"
          top="0"
          left="0"
        >
          <Box boxShadow={3} borderRadius="50%">
            <IconButton
              className={classes.scrollButton}
              size="small"
              onClick={() => scrollTo(0, 0)}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {scrollPos < maxScrollPos && (
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          position="absolute"
          top="0"
          right="0"
        >
          <Box boxShadow={3} borderRadius="50%">
            <IconButton
              className={classes.scrollButton}
              size="small"
              onClick={() => scrollTo(maxScrollPos, 0)}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
