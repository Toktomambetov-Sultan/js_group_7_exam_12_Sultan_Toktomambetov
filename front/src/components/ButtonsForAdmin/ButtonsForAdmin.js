import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  buttons: {
    marginTop: "auto",
  },
}));

const ButtonsForAdmin = ({ onDelete, onAccept, obj }) => {
  const classes = useStyle();
  return (
    <Grid item container direction="column">
      <Box width="100%" borderRadius="4px" border="1px solid grey">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          creater:
          <Typography variant="subtitle1">{obj.user.username}</Typography>
        </Grid>
      </Box>
      <Grid
        container
        item
        className={classes.buttons}
        direction="row"
        justify="space-between"
        wrap="nowrap"
      >
        {!obj.published && (
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={onAccept}
          >
            accept
          </Button>
        )}
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          onClick={onDelete}
        >
          delete
        </Button>
      </Grid>
    </Grid>
  );
};

export default ButtonsForAdmin;
