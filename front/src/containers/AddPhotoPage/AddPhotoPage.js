import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhotoForm from "../../components/PhotoForm/PhotoForm";
import { postPhoto } from "../../store/gallery/galleryAction";

const AddPhotoPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.gallery);
  const [currentPhoto, setCurrentPhoto] = useState({
    image: null,
    title: "",
  });
  const onFormChange = (event) => {
    const { name } = event.target;
    let value;
    switch (name) {
      case "image":
        value = event.target.files[0];
        break;
      default:
        value = event.target.value;
    }
    setCurrentPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(postPhoto(currentPhoto));
  };
  return (
    <div>
      <PhotoForm
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        photo={currentPhoto}
        error={state.error?.error.errors}
      />
    </div>
  );
};

export default AddPhotoPage;
