import React, { useState } from "react";
import SearchInput from "../search-input/search-input";
import SearchResultsPopover from "../search-results-popover/search-results-popover";

export default function SymbolSearchHoc() {
  const [searchTerm, setSearchTerm] = useState("msft");
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <SearchInput
        placeholder="Search"
        searchTerm={searchTerm}
        onSetSearchTerm={(text) => {
          if (text) {
            setSearchTerm(text);
            setOpen(true);
          } else {
            setOpen(false);
          }
        }}
        onBlur={() => setOpen(false)}
      />
      <SearchResultsPopover open={open} searchTerm={searchTerm} />
    </React.Fragment>
  );
}
