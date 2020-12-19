import { makeStyles, Modal } from "@material-ui/core";
import React from "react";
import config from "../../config";

const useStyles = makeStyles((theme) => ({
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

const ImageModal = ({ modalOpen, onClose, currentPhoto }) => {
  const classes = useStyles();
  return (
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
  );
};

export default ImageModal;
