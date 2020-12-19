import { Button, Grid, makeStyles} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({}));

const OwnButtons = ({ onDelete }) => {
  const classes = useStyle();
  return (
    <Grid
      container
      item
      className={classes.buttons}
      direction="row"
      justify="space-between"
      wrap="nowrap"
    >
      <Button
        color="secondary"
        fullWidth
        variant="contained"
        onClick={onDelete}
      >
        delete
      </Button>
    </Grid>
  );
};

export default OwnButtons;
