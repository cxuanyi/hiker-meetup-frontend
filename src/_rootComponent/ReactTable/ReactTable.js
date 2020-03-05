import React, { Fragment } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter
} from "react-table";
import matchSorter from "match-sorter";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
// icons
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// others
import Button from "../CustomButtons/Button";
// style
import styles from "./jss/reactTableStyle";

const useStyles = makeStyles(styles);

export default function ReactTable({ columns, data, defaultSorted = [] }) {
  const classes = useStyles();
  // Use the state and functions returned from useTable to build your UI

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  // Define a default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, setFilter }
    // column: { filterValue, preFilteredRows, setFilter }
  }) {
    // const count = preFilteredRows.length;

    return (
      <TextField
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Search`}
        size="small"
      />
    );
  }

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
  }
  fuzzyTextFilterFn.autoRemove = val => !val;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: { pageIndex, pageSize },
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, sortBy: defaultSorted },
      defaultColumn,
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <div className={classes.outer}>
      <TableContainer>
        <Table {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow
                key={i}
                className={classes.tableRow + " " + classes.tableRowHead}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column, j) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <Fragment key={`${i}${j}`}>
                    <TableCell
                      key={`${i}${j}`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div
                        className={
                          classes.tableHeadFontSize +
                          " " +
                          classes[column.align]
                        }
                      >
                        {column.render("Header")}
                        {/* Add a sort direction indicator */}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDropDownIcon fontSize="small" />
                          ) : (
                            <ArrowDropUpIcon fontSize="small" />
                          )
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </TableCell>
                  </Fragment>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  key={i}
                  className={i % 2 === 0 ? classes.tableStripedRow : null}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, j) => {
                    return (
                      <TableCell
                        key={`${i}${j}`}
                        {...cell.getCellProps()}
                        className={classes[headerGroups[0].headers[j]["align"]]}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {page && page.length > 0 ? null : (
        <div className={classes.noRecordsFound}>No records found.</div>
      )}
      <div className={classes.pagination}>
        <div className={classes.pagingButtons}>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </Button>{" "}
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </Button>{" "}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </Button>{" "}
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
        </div>
        <div className={classes.pagingInput}>
          <TextField
            id="pageIndex"
            name="pageIndex"
            label="Current Page"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            size="small"
            variant="outlined"
          />
          <FormControl variant="outlined" size="small">
            <Select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.pagingText}>
          {" "}
          <Typography>
            Page {pageIndex + 1} of {pageOptions.length} | Go to page:{" "}
          </Typography>
        </div>
      </div>
    </div>
  );
}

ReactTable.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.bool,
  columns: PropTypes.array,
  column: PropTypes.object,
  data: PropTypes.array,
  defaultSorted: PropTypes.array,
  children: PropTypes.node
};
