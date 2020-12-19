import { Button, Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageModal from "../../components/ImageModal/ImageModal";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import config from "../../config";
import { deletePhoto, getPhotos } from "../../store/gallery/galleryAction";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  titleBelongs: {
    display: "inline-block",
    margin: "5px",
  },
}));

const GalleryPage = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.gallery);
  const user = useSelector((state) => state.user.user);
  const currentUser = state.currentUser;

  useEffect(() => {
    dispatch(getPhotos(props.match.params.id));
  }, [props.match.params.id]);
  const onOpen = (url) => {
    setModalOpen(true);
    setCurrentPhoto(url);
  };
  const onClose = () => {
    setModalOpen(false);
    setCurrentPhoto("");
  };
  const onAdd = () => {
    dispatch(push("/add-photo"));
  };
  const onDelete = (id) => {
    dispatch(deletePhoto(id));
  };
  return (
    <div>
      <div className={classes.title}>
        <div>
          <Typography variant="h5" className={classes.titleBelongs}>
            creator:
          </Typography>
          <Typography variant="h5" className={classes.titleBelongs}>
            {props.match.params.id
              ? currentUser?.email || currentUser?.displayName
              : "all"}
          </Typography>
        </div>
        {user?.token && user?._id === props.match.params.id && (
          <Button onClick={() => onAdd()} variant="outlined" color="secondary">
            add photo
          </Button>
        )}
      </div>
      <Grid container direction="row" alignItems="center" justify="center">
        {state.photos.map((photo) => (
          <PhotoItem
            key={photo._id}
            photo={photo}
            onOpen={() => onOpen(photo.image)}
            show={!!props.match.params.id}
            onDelete={() => onDelete(photo._id)}
          />
        ))}
      </Grid>
      <ImageModal
        onClose={onClose}
        modalOpen={modalOpen}
        currentPhoto={currentPhoto}
      />
    </div>
  );
};

export default GalleryPage;
