import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  getTable,
  addCurrency,
  editCurrency,
  deleteCurrency,
} from "../Redux/actions/table";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};
export default function MyTable() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.table.tableData);
  const [tableRows, setTableRows] = useState([]);
  const [tableRow, setTableRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  useEffect(() => {
    dispatch(getTable());
  }, []);

  useEffect(() => {
    if (tableData ) {
      setTableRows(tableData);
    }
  }, [tableData]);

  const handleDeleteClick = (row) => {
    dispatch(deleteCurrency(row.dbId)).then(() => {
      dispatch(getTable());
    });
  };

  const handleRowEdit = (row) => {
    setTableRow(row);
    if (row.name) {
      setOpen(true);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setTableRow(null);
  };

  const handleChange = (e) => {
    setTableRow({ ...tableRow, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (addButtonClicked) {
      dispatch(addCurrency(tableRow)).then(() => {
        dispatch(getTable());
        setOpen(false);
        setAddButtonClicked(false);
      });
    } else {
      dispatch(editCurrency(tableRow, tableRow.dbId)).then(() => {
        dispatch(getTable());
        setOpen(false);
      });
    }
    setTableRow(null);
  };

  const handleClose = () => {
    setOpen(false);
    setTableRow(null);
  };

  const handleAdd = () => {
    setAddButtonClicked(true);
    setOpen(true);
  };
  const handleSearch = (e) => {
    setTableRows(tableData);
    if (e.target.value === "") {
      return;
    }
    const data = [...tableData];
    const result = data.filter((item) =>
      item.name.toLowerCase().includes(searchWord.toLowerCase())
    );
    setTableRows(result);
  };

  return (
    <Box sx={{ m: 1 }}>
      <Box sx={{ m: 1, mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <FormControl sx={{ mr: 5 }}>
          <InputLabel htmlFor="component-outlined">Search Currency</InputLabel>
          <OutlinedInput
            name="search"
            id="component-outlined"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            label="Search Currency By Name"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSearch} edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" onClick={handleAdd}>
          Add currency
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">N</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Currency</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={row.dbId}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell component="th" scope="row" name="name">
                  {row.name}
                </TableCell>
                <TableCell align="left" name="currency">
                  {row.currency}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    sx={{ mr: 1 }}
                    onClick={() => handleRowEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography sx={{ mb: 2, fontSize: "20px" }}>Add Currency</Typography>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Name</InputLabel>
            <OutlinedInput
              name="name"
              sx={{ mb: 2 }}
              value={tableRow?.name || ""}
              onChange={handleChange}
              label="Name"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-outlined">Currency</InputLabel>
            <OutlinedInput
              type="number"
              name="currency"
              id="component-outlined"
              value={tableRow?.currency || ""}
              onChange={handleChange}
              label="Currency"
            />
            <FormHelperText id="my-helper-text">Only numbers</FormHelperText>
          </FormControl>
          <Box sx={{ display: "flex", mt: 3, justifyContent: "flex-end" }}>
            <Button variant="contained" sx={{ mr: 1 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
