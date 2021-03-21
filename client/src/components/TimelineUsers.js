import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Tooltip } from "@material-ui/core";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import {
  getCurrentTimezone,
  getCurrentDateTime,
  toTimezone,
} from "../utils/timeZone";
import { getUsersByLocaltime } from "../selectors/userSelector";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function TimelineUsers() {
  const classes = useStyles();
  const users = useSelector(getUsersByLocaltime) || [];
  return (
    <div className={classes.root}>
      <h1>Timeline dashboard</h1>
      Your current time is{" "}
      <b>{toTimezone(getCurrentDateTime(), getCurrentTimezone())}</b> on
      timezone <b>{getCurrentTimezone()}</b>
      <Grid container spacing={3}>
        <Grid item xs>
          {users.length > 0 && (
            <Timeline align="alternate">
              {users.map((user) => (
                <TimelineItem key={user.username}>
                  <TimelineOppositeContent>
                    <Tooltip title={user.timeZone}>
                      <Typography variant="body2" color="textSecondary">
                        {user.localeTime}
                      </Typography>
                    </Tooltip>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                      <Typography variant="h6" component="h1">
                        {user.username}
                      </Typography>
                      <Avatar
                        alt={user.username}
                        src={`data:image/jpg;base64, ${user.picture}`}
                      />
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

// <TimelineItem>
// <TimelineOppositeContent>
//   <Typography color="textSecondary">
//     {toTimeZone(currentDate, user.timeZone)}
//   </Typography>
// </TimelineOppositeContent>
// <TimelineSeparator>
//   <TimelineDot />
//   <TimelineConnector />
// </TimelineSeparator>
// <TimelineContent>
//   <Typography>Eat</Typography>
// </TimelineContent>
// </TimelineItem>
