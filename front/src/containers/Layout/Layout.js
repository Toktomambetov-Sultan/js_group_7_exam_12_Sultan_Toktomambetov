import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../store/user/userActions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  displayName: {
    margin: "5px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };
  return (
    <div>
      <Backdrop className={classes.backdrop} open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar component={Box} position="static" pb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid item container justify="space-between" alignItems="center">
                <Typography variant="h4">Gallery</Typography>
                {user?.token && (
                  <Link to="/">
                    <Grid container alignItems="center" direction="row">
                      <Avatar alt="person image" src={user?.avatarImage} />
                      <Typography className={classes.displayName} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </Grid>
                  </Link>
                )}
                {user?.token && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" paddingTop="5px">
        <Container>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
