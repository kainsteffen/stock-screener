import {
  Box,
  Button,
  ButtonBase,
  createStyles,
  Dialog,
  makeStyles,
  MobileStepper,
  Typography,
  useTheme
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import CheckIcon from "@material-ui/icons/Check";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  defaultStrategies,
  saveStrategy,
  toggleFavoritedSymbol
} from "../../gql/local-state";
import Logo from "../logo/logo";
import InvestImage from "./invest.svg";
import "./onboarding-dialog.css";

const initStrategySelecton = [
  {
    key: "growth",
    name: "Growth",
    description:
      "Innovative and fast-growing companies are what fascinate you.",
    selected: true,
  },
  {
    key: "value",
    name: "Value",
    description: 'You want a good deal on "undervalued" companies.',
    selected: true,
  },
  {
    key: "dividends",
    name: "Dividends",
    description: "Regular cashflow is what's most important to you.",
    selected: true,
  },
  {
    key: "quality",
    name: "Quality",
    description: "You like your companies stable and healthy.",
    selected: true,
  },
  {
    key: "smallSize",
    name: "Small Size",
    description: "Betting on the underdog is right up your ally.",
    selected: true,
  },
  {
    key: "lowVolatility",
    name: "Low Volatility",
    description: "You want a safe and low-risk investment.",
    selected: true,
  },
];

const initSymbolSelection = [
  {
    ticker: "AAPL",
    name: "Apple",
    selected: true,
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    selected: true,
  },
  {
    ticker: "AMZN",
    name: "Amazon",
    selected: true,
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    selected: true,
  },
  {
    ticker: "FB",
    name: "Facebook",
    selected: true,
  },
  {
    ticker: "BABA",
    name: "Alibaba",
    selected: false,
  },
  {
    ticker: "TSM",
    name: "Taiwan Semiconductors",
    selected: false,
  },
  {
    ticker: "V",
    name: "Visa",
    selected: false,
  },
  {
    ticker: "JPM",
    name: "JPMorgan Chase",
    selected: false,
  },
  {
    ticker: "DIS",
    name: "Disney",
    selected: false,
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    dialogPaper: {
      width: "100%",
      height: "60%",
      boxSizing: "content-box",
      overflow: "hidden",
    },
    selectedBadge: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "0 0 0 10px;",
    },
  })
);

export interface OnboardingDialogProps {
  open: boolean;
  onDone: () => void;
}

export default function OnboardingDialog(props: OnboardingDialogProps) {
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [strategySelection, setStrategySelection] = useState(
    initStrategySelecton
  );
  const [symbolSelection, setSymbolSeleciton] = useState(initSymbolSelection);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDone = () => {
    strategySelection.forEach((strategy) => {
      if (strategy.selected) {
        saveStrategy(defaultStrategies[strategy.key]);
      }
    });
    symbolSelection.forEach((symbol) => {
      if (symbol.selected) {
        toggleFavoritedSymbol(symbol.ticker);
      }
    });
    props.onDone();
  };

  const toggleStrategySelection = (key: string) => {
    const newArr = strategySelection.map((strategy) => {
      if (strategy.key === key) {
        return {
          ...strategy,
          selected: !strategy.selected,
        };
      } else {
        return strategy;
      }
    });
    setStrategySelection(newArr);
  };

  const toggleSymbolSelection = (ticker: string) => {
    const newArr = symbolSelection.map((symbol) => {
      if (symbol.ticker === ticker) {
        return {
          ...symbol,
          selected: !symbol.selected,
        };
      } else {
        return symbol;
      }
    });
    setSymbolSeleciton(newArr);
  };

  return (
    <Dialog
      open={props.open}
      classes={{
        paper: classes.dialogPaper,
      }}
    >
      <Box
        boxSizing="content-box"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <SwipeableViews style={{ overflow: "hidden" }} index={activeStep}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={220} height={220} marginBottom={7}>
                <img src={InvestImage} />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                paddingX={15}
              >
                <Typography variant="h5" gutterBottom>
                  Track and Find stocks
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Always stay up to date with your portfolio and be on the
                  lookout for new opportunities.
                </Typography>
              </Box>
            </Box>
            <Box padding={3}>
              <Box marginBottom={2}>
                <Typography variant="h5">
                  An investing style that fits you
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Choose strategies that match your personal goals and beliefs
                </Typography>
              </Box>
              <Box height="100%" width="100%">
                <Box display="flex" flexWrap="wrap" overflow="hidden">
                  {strategySelection.map((strategy) => {
                    return (
                      <Box
                        width="45%"
                        marginLeft={1}
                        marginRight={1}
                        marginTop={1.5}
                        marginBottom={1.5}
                        border={
                          strategy.selected
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid grey"
                        }
                        borderRadius="10px"
                        maxHeight={100}
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        <ButtonBase
                          onClick={() => toggleStrategySelection(strategy.key)}
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-start"
                            textAlign="start"
                            padding={1}
                          >
                            <Typography variant="subtitle1">
                              {strategy.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {strategy.description}
                            </Typography>
                          </Box>
                          {strategy.selected && (
                            <Box
                              position="absolute"
                              top={0}
                              right={0}
                              className={classes.selectedBadge}
                            >
                              <CheckIcon fontSize="small" />
                            </Box>
                          )}
                        </ButtonBase>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            <Box padding={3}>
              <Box marginBottom={2}>
                <Typography variant="h5">
                  Stay up to date with your investments
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Choose some companies to follow right away
                </Typography>
              </Box>
              <Box height="100%" width="100%">
                <Box display="flex" flexWrap="wrap" overflow="hidden">
                  {symbolSelection.map((symbol) => {
                    return (
                      <Box
                        width="45%"
                        marginLeft={1}
                        marginRight={1}
                        marginTop={1.5}
                        marginBottom={1.5}
                        border={
                          symbol.selected
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid grey"
                        }
                        borderRadius="10px"
                        maxHeight={100}
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        <ButtonBase
                          onClick={() => {
                            toggleSymbolSelection(symbol.ticker);
                          }}
                          style={{ width: "100%" }}
                        >
                          <Box
                            width="100%"
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            textAlign="start"
                            padding={1}
                          >
                            <Box marginRight={1}>
                              <Logo
                                symbol={symbol.ticker}
                                width={40}
                                height={40}
                              />
                            </Box>
                            <Box>
                              <Typography variant="subtitle1">
                                {symbol.ticker}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {symbol.name}
                              </Typography>
                            </Box>
                          </Box>
                          {symbol.selected && (
                            <Box
                              position="absolute"
                              top={0}
                              right={0}
                              className={classes.selectedBadge}
                            >
                              <CheckIcon fontSize="small" />
                            </Box>
                          )}
                        </ButtonBase>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </SwipeableViews>
        </Box>
        <MobileStepper
          variant="dots"
          steps={3}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep < 2 ? (
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 5}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            ) : (
              <Button
                size="small"
                onClick={handleDone}
                disabled={activeStep === 5}
              >
                <Box marginRight={0.5}>Done</Box>
                <CheckIcon fontSize="small" />
              </Button>
            )
          }
          backButton={
            !(activeStep === 0) ? (
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            ) : (
              <Box width={69} />
            )
          }
        />
      </Box>
    </Dialog>
  );
}
