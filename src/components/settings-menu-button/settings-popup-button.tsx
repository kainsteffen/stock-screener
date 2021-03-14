import { IconButton, Menu, MenuItem } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";

export interface SettingsMenuButtonProps {
  onOpenCustomizeDashboard: () => void;
}

export default function SettingsMenuButton(props: SettingsMenuButtonProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            props.onOpenCustomizeDashboard();
          }}
        >
          Customize Dashboard
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
