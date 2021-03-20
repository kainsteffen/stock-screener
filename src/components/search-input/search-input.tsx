import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      //width: '60%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

export interface SearchInputProps {
  placeholder: string;
  searchTerm: string;
  onSetSearchTerm: (searchTerm: string) => void;
  onBlur?: () => void;
}

export default function SearchInput(props: SearchInputProps) {
  const classes = useStyles();

  const onChange = (event: any) => {
    props.onSetSearchTerm(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        onChange={onChange}
        onBlur={() => props.onBlur && props.onBlur()}
        className={classes.input}
        placeholder={props.placeholder}
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
}
