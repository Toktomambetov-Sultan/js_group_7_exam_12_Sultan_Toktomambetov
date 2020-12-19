import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../config";
import ButtonsForAdmin from "../OwnButtons/OwnButtons";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "20px",
    width: "333px",
    padding: "5px",
  },
  image: {
    width: "323px",
    height: "auto",
    maxHeight: "300px",
  },
  button: {
    border: "none",
    padding: "0",
  },
}));

const PhotoItem = ({ photo, onDelete, show, onOpen }) => {
  const classes = useStyle();
  const user = useSelector((state) => state.user.user);
  return (
    <Grid
      item
      container
      className={classes.item}
      direction="column"
      justify="space-between"
      component={Paper}
      elevation={3}
    >
      <Grid container direction="column">
        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Typography variant="h6">title:</Typography>
            <Typography variant="subtitle1">{photo.title}</Typography>
          </Grid>
          <Grid item container justify="space-between" alignItems="center">
            <Typography variant="h6">Creater:</Typography>
            <Typography variant="subtitle1">
              <Link to={"/gallery/" + photo.user._id}>
                {photo.user.email || photo.user.displayName}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          {photo.image && (
            <Button className={classes.button} onClick={onOpen}>
              <img
                className={classes.image}
                alt={photo.name}
                src={config.ImageUrl + photo.image}
              />
            </Button>
          )}
        </Grid>
      </Grid>

      {show && user._id === photo.user._id && (
        <ButtonsForAdmin onDelete={onDelete} />
      )}
    </Grid>
  );
};

export default PhotoItem;
