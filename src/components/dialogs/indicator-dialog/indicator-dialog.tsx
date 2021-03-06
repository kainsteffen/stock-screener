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
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { IndicatorValue } from "../../../gql/local-state";
import { InfoButton } from "../../info-button/info-button";
import SearchInput from "../../search-input/search-input";

const useStyles = makeStyles({
  indicatorList: {
    maxHeight: "100%",
    overflow: "auto",
  },
  dialogContent: {
    padding: 0,
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
  onSelectIndicators: (indicators: IndicatorValue[]) => void;
}

export default function IndicatorDialog(props: IndicatorDialogProps) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSelectionOnly, setShowSelectionOnly] = useState(false);
  const { data, loading, error } = useQuery(INDICATORS, {
    variables: { filter: "{}" },
  });
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<IndicatorValue[]>(
    props.initIndicators
  );

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
          <SearchInput
            placeholder="Search"
            searchTerm={searchTerm}
            onSetSearchTerm={(searchTerm) => setSearchTerm(searchTerm)}
          />
        </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          {/* TODO: Make box height responsive */}
          <Box height="73vh">
            <List className={classes.indicatorList}>
              {data.indicators
                .filter((indicator: any) => {
                  if (searchTerm) {
                    return (
                      indicator.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      indicator.key
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    );
                  } else {
                    return true;
                  }
                })
                .filter((indicator: any) => {
                  if (showSelectionOnly) {
                    return selection.map((s) => s.key).includes(indicator.key);
                  } else {
                    return true;
                  }
                })
                .map((indicator: any) => (
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={showSelectionOnly}
                onClick={() => setShowSelectionOnly(!showSelectionOnly)}
              />
              <Typography>Only show selection</Typography>
            </Box>
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
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
