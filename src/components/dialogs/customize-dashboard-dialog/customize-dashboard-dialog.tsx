import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import {
  reorderDashboardElement,
  toggleSelectedDashboardElement,
} from "../../../gql/local-state";
import { dashboardElementsVar } from "../../../gql/local-state/dashboard-elements/models";

const useStyles = makeStyles({
  indicatorList: {
    maxHeight: "100%",
    overflow: "auto",
  },
  dialogContent: {
    padding: 0,
  },
});

export interface CustomizeDashboardDialogProps {
  open: boolean;
  onSetOpen: (open: boolean) => void;
}

export default function CustomizeDashboardDialog(
  props: CustomizeDashboardDialogProps
) {
  const classes = useStyles();
  const dashboardElements = useReactiveVar(dashboardElementsVar);

  return (
    <div>
      <Dialog
        open={props.open}
        onBackdropClick={() => props.onSetOpen(false)}
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Customize Dashboard</Typography>

            <IconButton onClick={() => props.onSetOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          {/* TODO: Make box height responsive */}
          <Box height="73vh">
            {dashboardElements.map((dashboardElement, index, arr) => (
              <ListItem key={dashboardElement.key}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box display="flex">
                    <Box marginRight={2}>
                      <Checkbox
                        onClick={() =>
                          toggleSelectedDashboardElement(dashboardElement.key)
                        }
                        checked={dashboardElement.selected}
                        disableRipple
                      />
                    </Box>

                    <Box>
                      <ListItemText>{dashboardElement.name}</ListItemText>
                      <Typography variant="body2" color="textSecondary">
                        {dashboardElement.description}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <IconButton
                      disabled={index === 0}
                      onClick={(event: any) => {
                        event.stopPropagation();
                        reorderDashboardElement(index, index - 1);
                      }}
                    >
                      <ArrowDropUpIcon />
                    </IconButton>
                    <IconButton
                      disabled={index === arr.length - 1}
                      onClick={(event: any) => {
                        event.stopPropagation();
                        reorderDashboardElement(index, index + 1);
                      }}
                    >
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
