import { Grid, makeStyles, Modal, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import config from "../../config";
import { getPhotos } from "../../store/gallery/galleryAction";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  titleBelongs: {
    display: "inline-block",
    margin: "5px",
  },
  image: {
    width: "800px",
    height: "auto",
  },
  imageWraper: {
    position: "absolute",
    left: "50%",
    top: "50vh",
    transform: "translate(-50%,-50%)",
  },
}));

const GalleryPage = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.gallery);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getPhotos(props.match.params.id));
  }, []);
  const onOpen = (url) => {
    setModalOpen(true);
    setCurrentPhoto(url);
  };
  const onClose = () => {
    setModalOpen(false);
    setCurrentPhoto("");
  };
  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h5" className={classes.titleBelongs}>
          creator:
        </Typography>
        <Typography variant="h5" className={classes.titleBelongs}>
          {props.match.params.id ? user.email || user.displayName : "all"}
        </Typography>
      </div>

      <Grid container direction="row" alignItems="center" justify="center">
        {state.photos.map((photo) => (
          <PhotoItem
            key={photo._id}
            photo={photo}
            onOpen={() => onOpen(photo.image)}
            show={!!props.match.params.id}
          />
        ))}
      </Grid>
      <Modal open={modalOpen} onClose={() => onClose()}>
        <div className={classes.imageWraper}>
          {currentPhoto && (
            <img
              alt="image"
              className={classes.image}
              src={config.ImageUrl + currentPhoto}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
