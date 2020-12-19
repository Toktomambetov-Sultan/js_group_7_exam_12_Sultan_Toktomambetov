import React from "react";
import { useDispatch } from "react-redux";

const GalleryPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.gallery);
  return <div></div>;
};

export default GalleryPage;
