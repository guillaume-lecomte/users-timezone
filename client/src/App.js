import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import TimelineUsers from "./components/TimelineUsers";
import UsersList from "./components/users/UsersList";
import AddUser from "./components/users/AddUser";
import UpdateUser from "./components/users/UpdateUser";
import "./App.css";
import { getUsersRequest } from "./actions/userActions";
import { closeErrorToaster } from "./actions/errorActions";
import { getCurrentErrorsSelector } from "./selectors/errorSelector";

const App = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(getCurrentErrorsSelector);

  useEffect(() => {
    dispatch(getUsersRequest());
  }, [dispatch]);

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeErrorToaster());
  };

  return (
    <div className="App">
      <Header />
      <Container maxWidth="md"></Container>
      <Route exact path="/">
        <TimelineUsers />
      </Route>
      <Route path="/users">
        <UsersList />
      </Route>
      <Route path="/add-user">
        <AddUser />
      </Route>
      <Route exact path="/update-user/:id">
        <UpdateUser />
      </Route>
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          An unexpected error occured :(
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
