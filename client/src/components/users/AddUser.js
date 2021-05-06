import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Avatar,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import momentTZ from "moment-timezone";
import { addUserRequest } from "../../actions/userActions";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    timeZone: "",
    picture: null,
    preview: null,
  });
  const handleChangeName = ({ target }) => {
    setUser((prevState) => ({
      ...prevState,
      username: target.value,
    }));
  };

  const handleAvatar = ({ target }) => {
    let reader = new FileReader();
    let file = target.files[0];

    reader.onloadend = () => {
      setUser((prevState) => ({
        ...prevState,
        picture: file,
        preview: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    dispatch(addUserRequest(user));
    history.push("/users");
  };

  const canAdd = () => {
    const { username, timeZone, picture } = user;
    return (
      username.trim() !== "" && timeZone && timeZone.trim() !== "" && picture
    );
  };

  return (
    <div>
      <h1>Add new user</h1>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <TextField
            id="username-basic"
            label="Name"
            value={user.username}
            onChange={handleChangeName}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="timezone-select"
            value={user.timeZone}
            onChange={(event, newValue) => {
              setUser((prevState) => ({
                ...prevState,
                timeZone: newValue,
              }));
            }}
            style={{ width: 300 }}
            options={momentTZ.tz.names()}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            getOptionLabel={(option) => option}
            getOptionSelected={(option, value) => option.name === value.name}
            renderOption={(option) => (
              <React.Fragment>
                <span>{option}</span>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a timezone"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Avatar
            alt={user.username}
            src={user.preview}
            className={classes.large}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/jpeg"
            className={classes.input}
            id="faceImage"
            type="file"
            onChange={handleAvatar}
          />
          <Tooltip title="Select Image">
            <label htmlFor="faceImage">
              <IconButton
                className={classes.faceImage}
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          </Tooltip>
          <label>{user.picture ? user.picture.name : "Select Avatar"}</label>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
            disabled={!canAdd()}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
