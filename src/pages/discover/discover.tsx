import { useReactiveVar } from "@apollo/client";
import { Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import SymbolTable from "../../components/symbol-table/symbol-table";
import TabButtonBar from "../../components/tab-button-bar/tab-button-bar";
import { strategiesVar } from "../../gql/local-state";

const useStyles = makeStyles({});

export default function Discover() {
  const classes = useStyles();
  const strategies = useReactiveVar(strategiesVar);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies.ids[0]);
  const strategy = strategies.entities[selectedStrategy];
  const [cursors, setCursors] = useState<{ [id: number]: number }>(
    strategies.ids.reduce((map: { [id: number]: number }, id: number) => {
      map[id] = 0;
      return map;
    }, {})
  );

  const onSetCursor = (limit: number) => {
    const nextVal = cursors[selectedStrategy] + limit;
    setCursors((prev: { [id: number]: number }) => ({
      ...prev,
      [selectedStrategy]: nextVal,
    }));
  };

  return (
    <Container>
      <TabButtonBar
        selected={selectedStrategy}
        onSelect={(value: any) => setSelectedStrategy(value)}
        options={strategies.ids.map((id: number) => ({
          name: strategies.entities[id].name,
          value: id,
        }))}
      />

      {strategy && (
        <SymbolTable
          cursor={cursors[selectedStrategy]}
          onSetCursor={onSetCursor}
          strategy={strategy}
        />
      )}
    </Container>
  );
}
