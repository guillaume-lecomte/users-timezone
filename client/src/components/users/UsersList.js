import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { DeleteForever, Edit } from "@material-ui/icons";
import {
  Avatar,
  ButtonGroup,
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getUsersSelector } from "../../selectors/userSelector";
import { removeUserRequest } from "../../actions/userActions";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}))(TableCell);

export default function UsersList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);

  const handleDeleteUser = (userId) => {
    dispatch(removeUserRequest(userId));
  };

  return (
    <div>
      <h1>Users list ({users.length})</h1>
      {users.length > 0 && (
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="users list table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Avatar</StyledTableCell>
                <StyledTableCell>Timezone</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell component="th" scope="user">
                    {user.username}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      alt={user.username}
                      src={`data:image/jpg;base64, ${user.picture}`}
                    />
                  </TableCell>
                  <TableCell>{user.timeZone}</TableCell>
                  <TableCell align="right">
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        onClick={() => {
                          history.push(`/update-user/${user._id}`);
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button onClick={() => handleDeleteUser(user._id)}>
                        <DeleteForever />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
