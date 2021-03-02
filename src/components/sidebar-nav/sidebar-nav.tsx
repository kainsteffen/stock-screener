import { List, ListItem, ListItemText } from "@material-ui/core";
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
          route: "/",
          name: "Home",
        },
        {
          route: "/strategies",
          name: "Strategies",
        },
        {
          route: "/discover",
          name: "Discover",
        },
        {
          route: "/favorites",
          name: "Favorites",
        },
      ].map((item) => (
        <ListItem
          button
          component="a"
          onClick={() => onRedirect(item.route)}
          // href={`//${window.location.hostname}/${item.route}`}
          key={item.route}
        >
          {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
}
