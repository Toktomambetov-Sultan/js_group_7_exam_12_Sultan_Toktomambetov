import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoItem from "../../components/PhotoItem/PhotoItem";
import { getPhotos } from "../../store/gallery/galleryAction";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.gallery);
  useEffect(() => {
    dispatch(getPhotos());
  }, []);

  return (
    <Grid container direction="row" alignItems="center" justify="center">
      {state.photos.map((photo) => (
        <PhotoItem photo={photo} />
      ))}
    </Grid>
  );
};

export default GalleryPage;
