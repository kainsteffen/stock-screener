import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { IndicatorValue } from "../../../gql/cache";
import { InfoButton } from "../../info-button/info-button";
import SearchInput from "../../search-input/search-input";

const useStyles = makeStyles({
  indicatorList: {
    maxHeight: "100%",
    overflow: "auto",
  },
});

const INDICATORS = gql`
  query getIndicators($filter: String!) {
    indicators(filter: $filter) {
      key
      name
      type
      description
      investopediaUrl
      valueType
    }
  }
`;

export interface IndicatorDialogProps {
  initIndicators: IndicatorValue[];
  onSelectIndicators: Function;
}

export default function IndicatorDialog(props: IndicatorDialogProps) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(INDICATORS, {
    variables: { filter: "{}" },
  });
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<IndicatorValue[]>(
    props.initIndicators
  );
  const [searchFilter, setSearchFilter] = useState("");

  if (loading) return <React.Fragment />;
  if (error) return <p>Error</p>;

  const onOpen = () => {
    setSelection(props.initIndicators);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelect = (indicator: any) => {
    const selected = selection.find((s) => s.key == indicator.key);
    if (selected) {
      setSelection(selection.filter((s) => s.key !== indicator.key));
    } else {
      setSelection([
        ...selection,
        {
          key: indicator.key,
          type: indicator.type,
          name: indicator.name,
          description: indicator.description,
          investopediaUrl: indicator.investopediaUrl,
          valueType: indicator.valueType,
          values: { min: 0, max: 1, thresholdType: "above" },
        },
      ]);
    }
  };
  return (
    <div>
      <Button
        onClick={onOpen}
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
      >
        <Typography>Add</Typography>
      </Button>
      <Dialog open={open} onBackdropClick={onClose} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Indicators</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SearchInput />
        </DialogTitle>
        <DialogContent dividers>
          <List className={classes.indicatorList}>
            {data.indicators.map((indicator: any) => (
              <ListItem
                key={indicator.key}
                onClick={() => onSelect(indicator)}
                button
              >
                <ListItemIcon>
                  <Checkbox
                    checked={selection
                      .map((s) => s.key)
                      .includes(indicator.key)}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={indicator.name} />
                <InfoButton
                  title={indicator.name}
                  description={indicator.description}
                  url={indicator.investopediaUrl}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              props.onSelectIndicators(selection);
              onClose();
            }}
            color="primary"
          >
            Save Selection
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
