import { Box, TextField, Typography } from "@material-ui/core";
import React from "react";
import { thresholdTypes } from "../../../gql/local-state";
import { DropdownMenu } from "../../dropdown-menu/dropdown-menu";

export interface ThresholdControllerProps {
  min: string;
  max: string;
  thresholdTypeId: string;
  onSetValue: (min: string, max: string, thresholdTypeId: string) => void;
}

export default function ThresholdController(props: ThresholdControllerProps) {
  const onSetType = (index: number) => {
    props.onSetValue(props.min, props.max, thresholdTypes[index].key);
  };

  const onSetMin = (e: any) => {
    props.onSetValue(e.target.value, props.max, props.thresholdTypeId);
  };

  const onSetMax = (e: any) => {
    props.onSetValue(props.min, e.target.value, props.thresholdTypeId);
  };

  return (
    <Box display="flex" alignItems="center">
      <Box width={150}>
        <DropdownMenu
          initSelect={thresholdTypes.findIndex(
            (type) => type.key == props.thresholdTypeId
          )}
          options={thresholdTypes.map((type) => type.name)}
          onSelect={onSetType}
        />
      </Box>

      <Box width="10px" />
      <TextField
        id="outlined-basic"
        label="Value"
        variant="outlined"
        size="small"
        type="number"
        value={props.min}
        onChange={onSetMin}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {(props.thresholdTypeId === "between" ||
        props.thresholdTypeId === "outside") && (
        <React.Fragment>
          <Box marginX={2}>
            <Typography>-</Typography>
          </Box>
          <TextField
            id="outlined-basic"
            label="Value"
            variant="outlined"
            size="small"
            type="number"
            value={props.max}
            onChange={onSetMax}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </React.Fragment>
      )}
    </Box>
  );
}
