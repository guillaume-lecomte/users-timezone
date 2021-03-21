import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  IconButton,
  Tooltip,
  TextField,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import momentTZ from "moment-timezone";
import { fetchUser } from "../../services/api";
import { modifyUserRequest } from "../../actions/userActions";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: "none",
  },
}));

export default function UpdateUser() {
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    timeZone: "",
    picture: null,
    preview: null,
  });

  useEffect(() => {
    async function retrieveUser() {
      const currentUser = await fetchUser(id);
      setUser(currentUser);
    }
    retrieveUser();
  }, [id]);

  const handleChangeName = ({ target }) => {
    setUser((prevState) => ({
      ...prevState,
      username: target.value,
    }));
  };

  const handleAvatar = async ({ target }) => {
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
    dispatch(modifyUserRequest(user));
    history.push("/users");
  };

  const canUpdate = () => {
    const { username, timeZone, picture } = user;
    return username.trim() !== "" && timeZone.trim() !== "" && picture;
  };
  return (
    <div>
      <h1>Update user</h1>
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
            id="standard-basic"
            label="Name"
            value={user.username || ""}
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
        <Grid item md={6}>
          <label>Current Avatar</label>
          <Avatar
            alt={user.username}
            src={`data:image/jpeg;base64,${user.picture}`}
            className={classes.large}
          />
        </Grid>
        {user.preview && (
          <Grid item md={6}>
            <label>New Avatar</label>
            <Avatar
              alt={user.username}
              src={user.preview}
              className={classes.large}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <input
            accept="image/jpeg"
            className={classes.input}
            id="avatar"
            type="file"
            onChange={handleAvatar}
          />
          <Tooltip title="Select Image">
            <label htmlFor="avatar">
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
            disabled={!canUpdate()}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
