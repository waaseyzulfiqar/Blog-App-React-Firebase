import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import {
  collection,
  db,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "../config/firebase";
import { Box, CircularProgress, Switch } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "Users"), where("type", "==", "user"));

      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setAllUsers(users);
      setIsLoading(false);
    } catch (error) {
      console.warn("All Users Fetching Error -->", error.message);
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleIsActive = async (event) => {
    try {
      await updateDoc(doc(db, "Users", event.target.id), {
        isActive: event.target.checked,
      });
      getAllUsers();
    } catch (error) {
      console.warn("isAcitve updation Error -->", error.message);
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer component={Paper} sx={{minWidth: 650}}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>isActive</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px", // You can adjust height
                  }}
                >
                  <CircularProgress size="30px" />
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            <TableBody>
              {allUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                allUsers.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.first_name}
                    </StyledTableCell>
                    <StyledTableCell>{row.last_name}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>{String(row.isActive)}</StyledTableCell>
                    <StyledTableCell>
                      <Switch
                        id={row.id}
                        defaultChecked={row.isActive}
                        onChange={handleIsActive}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
