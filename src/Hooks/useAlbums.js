
// src/hooks/useAlbums.js

import { useEffect, useReducer, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../config/fireBase.config";
import { toast, Bounce } from "react-toastify";

const albumReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "SET_ALBUMS":
      return {
        albums: payload.albums,
      };
    default:
      return state;
  }
};

export const useAlbums = () => {
  const [albumState, albumDispatch] = useReducer(albumReducer, { albums: [] });
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, "albums"), (snapShot) => {
        const albums = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        albumDispatch({ type: "SET_ALBUMS", payload: { albums } });
        setLoadingAlbums(false);
      });

      return () => unsub();
    } catch (error) {
      console.error("Error displaying albums:", error);
      toast.error("Failed to display data");
    }
  }, []);

  const addAlbum = async (album) => {
    try {
      const albumRef = collection(db, "albums");
      await addDoc(albumRef, album);
      toast.success("Album created successfully.", {
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
      console.error("Error adding album: ", error);
      toast.error("Error adding album!", {
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
    albumState,
    addAlbum,
    loadingAlbums,
  };
};

