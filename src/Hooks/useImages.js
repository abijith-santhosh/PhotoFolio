// src/hooks/useImages.js

import { useEffect, useReducer, useState } from "react";
import { collection, onSnapshot, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/fireBase.config";
import { toast, Bounce } from "react-toastify";

const imageReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "SET_IMAGES":
      return {
        images: payload.images,
      };
    case "ADD_IMAGE":
      return {
        images: [...state.images, payload.image],
      };
    case "UPDATE_IMAGE":
      return {
        images: state.images.map((img) =>
          img.id === payload.image.id ? payload.image : img
        ),
      };
    case "DELETE_IMAGE":
      return {
        images: state.images.filter((img) => img.id !== payload.id),
      };
    default:
      return state;
  }
};

export const useImages = (selectedAlbumId) => {
  const [imageState, imageDispatch] = useReducer(imageReducer, { images: [] });
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    setLoadingImages(true);
    if (selectedAlbumId) {
      const q = query(
        collection(db, "images"),
        where("albumId", "==", selectedAlbumId)
      );
      const unsub = onSnapshot(q, (snapshot) => {
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        imageDispatch({ type: "SET_IMAGES", payload: { images } });
        setLoadingImages(false);
      });

      return () => unsub();
    } else {
      setLoadingImages(false);
    }
  }, [selectedAlbumId]);

  const addImage = async (image, albumId) => {
    try {
      const imageRef = collection(db, "images");
      await addDoc(imageRef, { ...image, albumId: albumId ,addedAt:new Date().toLocaleString(),updatedAt:""});
      toast.success("📷 Image added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error adding image:", error);
      toast.error("Error adding image!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const updateImage = async (imageId, updatedImage) => {
    try {
      const imageDocRef = doc(db, "images", imageId);
      await updateDoc(imageDocRef, updatedImage);
      const updatedImageData = { id: imageId, ...updatedImage };
      imageDispatch({
        type: "UPDATE_IMAGE",
        payload: { image: updatedImageData },
      });
      toast.success("📷 Image updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Error updating image!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await deleteDoc(doc(db, "images", imageId));
      imageDispatch({ type: "DELETE_IMAGE", payload: { id: imageId } });
      toast.success("🗑️ Image deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Error deleting image!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return {
    imageState,
    addImage,
    updateImage,
    deleteImage,
    loadingImages,
  };
};
