import { Box, InputAdornment, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { thresholdTypes } from "../../../gql/local-state";
import { DropdownMenu } from "../../dropdown-menu/dropdown-menu";

export interface ThresholdControllerProps {
  min: string;
  max: string;
  thresholdTypeId: string;
  valueType: string;
  onSetIndicator: (min: string, max: string, thresholdTypeId: string) => void;
}

export default function ThresholdController(props: ThresholdControllerProps) {
  const onSetType = (index: number) => {
    props.onSetIndicator(props.min, props.max, thresholdTypes[index].key);
  };

  const onSetMin = (value: string) => {
    props.onSetIndicator(value, props.max, props.thresholdTypeId);
  };

  const onSetMax = (value: string) => {
    props.onSetIndicator(props.min, value, props.thresholdTypeId);
  };

  const numberValidator = (value: string) => {
    const parsed = parseFloat(value);
    if (parsed || parsed === 0) {
      return parsed.toString();
    } else {
      return null;
    }
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
      <TextFieldWrapper
        initValue={props.min}
        emitChange={(change: string) => {
          onSetMin(change);
        }}
        validator={numberValidator}
        valueType={props.valueType}
      />
      {(props.thresholdTypeId === "between" ||
        props.thresholdTypeId === "outside") && (
        <React.Fragment>
          <Box marginX={2}>
            <Typography>-</Typography>
          </Box>
          <TextFieldWrapper
            initValue={props.max}
            emitChange={(change: string) => {
              onSetMax(change);
            }}
            validator={numberValidator}
            valueType={props.valueType}
          />
        </React.Fragment>
      )}
    </Box>
  );
}

interface TextFieldWrapperProps {
  initValue: string;
  emitChange: (change: string) => void;
  validator: (value: string) => string | null;
  valueType: string;
}

function TextFieldWrapper(props: TextFieldWrapperProps) {
  const [value, setValue] = useState(props.initValue);
  const [isValid, setIsValid] = useState(true);

  const onChange = (event: any) => {
    setValue(event.target.value);
    setIsValid(!!props.validator(event.target.value));
  };

  const onKeyDown = (event: any) => {
    if (event.code === "Enter") {
      validateValue();
      (document?.activeElement as HTMLElement).blur();
    }
  };

  const onBlur = (event: any) => {
    validateValue();
  };

  const validateValue = () => {
    const validated = props.validator(value);
    if (validated) {
      setValue(validated);
      props.emitChange(validated);
      setIsValid(!!validated);
    } else {
      setValue(props.initValue);
      setIsValid(!!props.validator(props.initValue));
    }
  };

  return (
    <TextField
      id="outlined-basic"
      label="Value"
      variant="outlined"
      size="small"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      error={!isValid}
      // TODO: Make start and end adornment based on type scalable
      InputProps={{
        endAdornment: props.valueType === "percentage" && (
          <InputAdornment position="start">%</InputAdornment>
        ),
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
