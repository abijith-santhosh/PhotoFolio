import { useState } from "react";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./Components/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Components/NavBar/NavBar";
import AlbumForm from "./Components/AlbumForm/AlbumForm";
import AlbumList from "./Components/AlbumList/AlbumList";
import ImageForm from "./Components/ImageForm/ImageForm";
import ImageList from "./Components/ImageList/ImageList";
import { useAlbums } from "./Hooks/useAlbums";
import { useImages } from "./Hooks/useImages";

function App() {
  const { albumState, addAlbum, loadingAlbums } = useAlbums();
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const { imageState, addImage, updateImage, deleteImage, loadingImages } =
    useImages(selectedAlbumId);
  const [albumName, setAlbumName] = useState("");
  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [show, setShow] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleShow = () => {
    setShow((prevState) => !prevState);
    setShowImageForm(false);
  };

  const handleToggleAlbumForm = () => {
    setShowAlbumForm((prevState) => !prevState);
    setAlbumName("");
  };

  const handleToggleImageForm = () => {
    setShowImageForm((prevState) => !prevState);
    setIsEditing(false);
  };

  const resetImageToUpdate = () => {
    setImageToUpdate(null);
  };

  return (
    <>
      <div className="App">
        <ToastContainer />
        <Nav />
        <div className="content">
          {loadingAlbums || loadingImages ? (
            <LoadingSpinner/>
          ) : show ? (
            <>
              {showAlbumForm && (
                <AlbumForm
                  addAlbum={addAlbum}
                  albumName={albumName}
                  setAlbumName={setAlbumName}
                  setShowAlbumForm={setShowAlbumForm}
                />
              )}
              <AlbumList
                albums={albumState.albums}
                handleToggleAlbumForm={handleToggleAlbumForm}
                showAlbumForm={showAlbumForm}
                handleToggleShow={handleToggleShow}
                setSelectedAlbumId={setSelectedAlbumId}
                setAlbumName={setAlbumName}
              />
            </>
          ) : (
            <>
              {showImageForm && (
                <ImageForm
                  addImage={addImage}
                  imageToUpdate={imageToUpdate}
                  resetImageToUpdate={resetImageToUpdate}
                  isEditing={isEditing}
                  updateImage={updateImage}
                  setShowImageForm={setShowImageForm}
                  selectedAlbumId={selectedAlbumId}
                />
              )}
              <ImageList
                albumName={albumName}
                handleToggleImageForm={handleToggleImageForm}
                showImageForm={showImageForm}
                handleToggleShow={handleToggleShow}
                images={imageState.images}
                changeImageToEdit={setImageToUpdate}
                setIsEditing={setIsEditing}
                deleteImage={deleteImage}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
