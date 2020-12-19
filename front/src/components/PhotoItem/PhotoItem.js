import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import config from "../../config";
import ButtonsForAdmin from "../OwnButtons/OwnButtons";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "20px",
    width: "333px",
  },
  button: {
    flexGrow: "1",
    maxWidth: "400px",
    textTransform: "inherit",
  },
  buttons: {
    marginTop: "auto",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const PhotoItem = ({ photo, onDelete }) => {
  const classes = useStyle();
  const user = useSelector((state) => state.user.user);
  return (
    <Grid
      item
      container
      className={classes.item}
      direction="column"
      justify="space-between"
    >
      <Grid container direction="column">
        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Typography variant="h6">title:</Typography>{" "}
            <Typography variant="subtitle1">{photo.ttle}</Typography>
          </Grid>
          <Grid item container justify="space-between" alignItems="center">
            <Typography variant="h6">Creater:</Typography>{" "}
            <Typography variant="subtitle1">
              {photo.user.email || photo.user.displayName}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          {photo.image && (
            <img
              className={classes.image}
              alt={photo.name}
              src={config.ImageUrl + photo.image}
            />
          )}
        </Grid>
      </Grid>

      {user._id === photo.user._id && <ButtonsForAdmin onDelete={onDelete} />}
    </Grid>
  );
};

export default PhotoItem;
