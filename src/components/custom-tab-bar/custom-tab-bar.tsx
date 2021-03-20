import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import FavoriteIcon from "@material-ui/icons/Favorite";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
});

export default function CustomTabBar() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const shouldRender = useMediaQuery(theme.breakpoints.down("sm"));
  const [selected, setSelected] = useState(history.location.pathname);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    setSelected(newValue);
    history.replace(newValue);
  };

  return shouldRender ? (
    <Box boxShadow={25} className={classes.root}>
      <BottomNavigation value={selected} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Favorites"
          value="/favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Strategies"
          value="/strategies"
          icon={<DescriptionIcon />}
        />
        <BottomNavigationAction
          label="Discover"
          value="/discover"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  ) : null;
}
