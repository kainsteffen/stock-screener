import { Box, Slider, TextField } from "@material-ui/core";
import React, { useState } from "react";

export function RangeController() {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  return (
    <Box width="100%">
      <Box display="flex" alignItems="center">
        <TextField
          id="outlined-basic"
          label="Min"
          variant="outlined"
          size="small"
          value={value[0]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box width="100%" paddingX={2}>
          <Slider
            value={value}
            valueLabelDisplay="auto"
            onChange={handleChange}
            aria-labelledby="range-slider"
          />
        </Box>
        <TextField
          id="outlined-basic"
          label="Max"
          variant="outlined"
          size="small"
          value={value[1]}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </Box>
  );
}
