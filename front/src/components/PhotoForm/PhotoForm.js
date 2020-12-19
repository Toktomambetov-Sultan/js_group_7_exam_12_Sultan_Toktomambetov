import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import FileUploader from "../UI/FileUploader/FileUploader";

const useStyles = makeStyles((theme) => ({
  top: {
    marginBottom: "30px",
    width: "500px",
  },
  Bottom: {
    padding: "30px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileUploader: {
    margin: "auto",
    maxWidth: "500px",
  },
  select: {
    minWidth: "300px",
  },
}));

const PhotoForm = ({ onSubmit, onChange, error, photo }) => {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="md">
      <Box
        textAlign="center"
        bgcolor="#fff"
        margin={1}
        padding={1}
        borderRadius={10}
      >
        <Typography variant="h5">Add new photo</Typography>
        <form onSubmit={onSubmit} noValidate>
          <TextField
            margin="normal"
            className={classes.top}
            error={!!error?.title}
            label={error?.title?.message || "title"}
            name="title"
            required
            autoFocus
            value={photo.title}
            onChange={onChange}
          />
          <div className={classes.fileUploader}>
            <FileUploader
              name="image"
              required
              onChange={onChange}
              error={!!error?.image}
              label={error?.image?.message || "image"}
            />
          </div>

          <Box marginTop={2} width="300px" display="inline-block">
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default PhotoForm;
