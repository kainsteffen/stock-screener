import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  IconButton,
  List,
  ListItem,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import DeleteDialog from "../../components/dialogs/delete-dialog.tsx/delete-dialog";
import IndicatorDialog from "../../components/dialogs/indicator-dialog/indicator-dialog";
import { RangeController } from "../../components/indicator-controllers/range-controller/range-controller";
import ThresholdController from "../../components/indicator-controllers/threshold-controller/threshold-controller";
import { InfoButton } from "../../components/info-button/info-button";
import {
  deleteStrategy,
  getNewStrategyId,
  IndicatorValue,
  saveStrategy,
  strategiesVar,
  Strategy,
} from "../../gql/local-state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indicatorContainer: {
      border: "1px solid lightgrey",
      borderRadius: 10,
    },
    textField: {
      "&:hover": { cursor: "pointer" },
      "& input": {
        fontSize: theme.typography.h5.fontSize,
      },
      "& input.Mui-disabled": {
        color: theme.typography.body1.color,
      },
    },
  })
);

export interface StrategyDetailProps {
  initStrategy?: Strategy;
}

export default function StrategyDetail(props: StrategyDetailProps) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const storeStrategies = useReactiveVar(strategiesVar);
  let initStrategy: Strategy | null = null;
  if (id) {
    initStrategy = storeStrategies.entities[parseInt(id)];
  }

  const [strategy, setStrategy] = useState<Strategy>(
    initStrategy ?? {
      id: getNewStrategyId(),
      name: "New Strategy",
      description: "",
      indicators: [],
    }
  );
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);
  const [titleError, setTitleError] = useState("");
  const titleRef = React.useRef<HTMLInputElement>();

  const redirect = () => {
    history.push("/strategies");
  };

  const titleOnChange = (e: any) => {
    if (e.target.value) {
      setStrategy({ ...strategy, name: e.target.value });
    }
  };

  const descriptionOnChange = (e: any) => {
    if (e.target.value) {
      setStrategy({ ...strategy, description: e.target.value });
    }
  };

  const titleOnKeyDown = (e: any) => {
    if (e.code === "Enter") {
      validateTitle(e.target.value);
    }
  };

  const titleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateTitle(e.target.value);
  };

  const validateTitle = (title: string) => {
    if (title) {
      setStrategy({ ...strategy, name: title });
      setTitleError("");
      setIsTitleEditMode(false);
    } else {
      setTitleError("Required");
    }
  };

  const onSave = () => {
    saveStrategy(strategy);
    redirect();
  };

  const onDelete = () => {
    if (initStrategy) {
      deleteStrategy(initStrategy.id);
      redirect();
    }
  };

  const onSelectIndicators = (indicators: IndicatorValue[]) => {
    setStrategy((prev) => ({ ...prev, indicators: indicators }));
  };

  const onSetIndicatorThreshold = (
    key: string,
    min: string,
    max: string,
    thresholdType: string,
    valueType: string
  ) => {
    // TODO: Make parse calculation based on type more scalable and remove > 1 workaround
    const parsedMin =
      valueType === "percentage" && parseFloat(min) > 1
        ? parseFloat(min) / 100
        : parseFloat(min);
    const parsedMax =
      valueType === "percentage" && parseFloat(max) > 1
        ? parseFloat(max) / 100
        : parseFloat(max);
    setStrategy((prev) => ({
      ...prev,
      indicators: prev.indicators.map((i) => {
        if (i.key === key) {
          return {
            ...i,
            values: {
              min: parsedMin,
              max: parsedMax,
              thresholdType: thresholdType,
            },
          };
        }
        return i;
      }),
    }));
  };

  const renderIndicatorController = (indicator: IndicatorValue) => {
    switch (indicator.type) {
      case "range":
        return <RangeController />;
      case "threshold":
        return (
          <ThresholdController
            min={indicator.values.min.toString()}
            max={indicator.values.max.toString()}
            thresholdTypeId={indicator.values.thresholdType}
            valueType={indicator.valueType}
            onSetIndicator={(
              min: string,
              max: string,
              thresholdType: string
            ) => {
              onSetIndicatorThreshold(
                indicator.key,
                min,
                max,
                thresholdType,
                indicator.valueType
              );
            }}
          />
        );
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Box display="flex" alignItems="center">
              <Box marginRight={1}>
                <IconButton
                  size="small"
                  onClick={() => {
                    setIsTitleEditMode(!isTitleEditMode);
                    setTimeout(() => {
                      titleRef.current?.focus();
                    }, 100);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <TextField
                onClick={() => {
                  !isTitleEditMode && setIsTitleEditMode(!isTitleEditMode);
                  setTimeout(() => {
                    titleRef.current?.focus();
                  }, 100);
                }}
                onChange={titleOnChange}
                onKeyDown={titleOnKeyDown}
                onBlur={titleOnBlur}
                defaultValue={strategy?.name ?? "New Strategy"}
                placeholder="Title"
                error={!!titleError}
                helperText={titleError}
                disabled={!isTitleEditMode}
                className={classes.textField}
                inputRef={titleRef}
                InputProps={{
                  disableUnderline: !isTitleEditMode,
                }}
                fullWidth
              ></TextField>
            </Box>
            <Box display="flex">
              {initStrategy && (
                <Box marginRight={1}>
                  <DeleteDialog
                    onConfirm={onDelete}
                    title="Delete Strategy"
                    description={`Are you sure you want to delete "${strategy.name}" permanently?`}
                  />
                </Box>
              )}
              <Box>
                <Button
                  onClick={onSave}
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
            <TextField
              onChange={descriptionOnChange}
              variant="outlined"
              defaultValue={strategy.description}
              label="Description"
              fullWidth
              multiline
            ></TextField>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h6">Indicators</Typography>
            <Box>
              <IndicatorDialog
                initIndicators={strategy?.indicators ?? []}
                onSelectIndicators={onSelectIndicators}
              />
            </Box>
          </Box>
          <List className={classes.indicatorContainer}>
            {strategy?.indicators
              .sort((a, b) => (a.key < b.key ? 0 : 1))
              .map((indicator, index) => {
                return (
                  <ListItem
                    key={indicator.key}
                    divider={index !== strategy.indicators.length - 1}
                  >
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
                          <Typography>{indicator.name}</Typography>
                          <InfoButton
                            title={indicator.name}
                            description={indicator.description}
                            url={indicator.investopediaUrl}
                          />
                        </Box>
                        <Box>
                          <IconButton size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      {renderIndicatorController(indicator)}
                    </Box>
                  </ListItem>
                );
              })}
            {strategy.indicators.length === 0 && (
              <ListItem>
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  paddingY={10}
                >
                  <Typography variant="h6" color="textSecondary">
                    No indicators selected
                  </Typography>
                </Box>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
