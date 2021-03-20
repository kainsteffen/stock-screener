import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { useHistory } from "react-router-dom";

export default function SidebarNav() {
  const history = useHistory();
  const onRedirect = (path: string) => {
    history.replace(path);
  };

  return (
    <List>
      {[
        {
          icon: <HomeIcon />,
          route: "/",
          name: "Home",
        },
        {
          icon: <DescriptionIcon />,
          route: "/strategies",
          name: "Strategies",
        },
        {
          icon: <SearchIcon />,
          route: "/discover",
          name: "Discover",
        },
      ].map((item) => (
        <ListItem
          button
          component="a"
          onClick={() => onRedirect(item.route)}
          key={item.route}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
}
