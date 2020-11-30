import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";
import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu";
import { RangeController } from "../../components/indicator-controllers/range-slider/range-controller";
import { InfoButton } from "../../components/info-button/info-button";
import SearchInput from "../../components/search-input/search-input";

const useStyles = makeStyles({
  indicatorContainer: {
    border: "1px solid lightgrey",
    borderRadius: 10,
  },
  table: {
    minWidth: 650,
  },
});

export default function CreateStrategy() {
  const classes = useStyles();

  return (
    <Container>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Box display="flex" alignItems="center">
              <Box marginRight={1}>
                <Typography variant="h5">Dividend Growth</Typography>
              </Box>
              <IconButton size="small">
                <EditIcon />
              </IconButton>
            </Box>
            <Box display="flex">
              <Box marginRight={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  <Typography>Delete</Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CheckIcon />}
                >
                  <Typography>Save</Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          <Box marginBottom={2}>
            <Typography>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="h6">Indicators</Typography>
          </Box>
          <Box marginBottom={2}>
            <SearchInput />
          </Box>
          <List className={classes.indicatorContainer}>
            <ListItem>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                marginBottom={1}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Box display="flex" alignItems="center">
                    <Typography>Dividend Yield</Typography>
                    <InfoButton
                      title="Dividend Yield"
                      description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                        dolor sit amet."
                    />
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <RangeController />
              </Box>
            </ListItem>
            <Divider />
            <ListItem>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                marginBottom={1}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Box display="flex" alignItems="center">
                    <Typography>Dividends Paid</Typography>
                    <InfoButton
                      title="Dividends Paid"
                      description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                        dolor sit amet."
                    />
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <DropdownMenu />
                  <Box width="10px" />
                  <TextField
                    id="outlined-basic"
                    label="Value"
                    variant="outlined"
                    size="small"
                    value="$ 0.21"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>
              </Box>
            </ListItem>
            <Divider />
            <ListItem>
              <Box
                display="flex"
                flexDirection="column"
                width="100%"
                marginBottom={1}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom={2}
                >
                  <Box display="flex" alignItems="center">
                    <Typography>New 52 Week High</Typography>
                    <InfoButton
                      title="52 Weel High"
                      description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                        erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                        dolor sit amet."
                    />
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">Auto-Detection</Typography>
              </Box>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
