import * as React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const navlinks = [
  { title: "Users list", path: "/users" },
  { title: "Add user", path: "/add-user" },
];

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <Link to={"/"} className={classes.linkText}>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
          </Link>
          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            {navlinks.map(({ title, path }) => (
              <Link key={path} to={path} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
