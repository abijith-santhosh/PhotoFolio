import ImageLists from "./imageList.module.css";
import Search from "../../static/images/search.png";
import Back from "../../static/images/back.png";
import Edit from "../../static/images/edit.png";
import Delete from "../../static/images/delete.png";
import Carousel from "../Carousel/Carousel";
import Cancel from "../../static/images/cancel.png";
import Warning from "../../static/images/warning.png";
import { useState } from "react";

function ImageList({
  albumName,
  handleToggleImageForm,
  showImageForm,
  handleToggleShow,
  images,
  changeImageToEdit,
  setIsEditing,
  deleteImage,
}) {
  console.log("Images:",images);
  const [carouselImages, setCarouselImages] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State to store search input

  const openCarousel = (image) => {
    setCarouselImages(images);
    setShowCarousel(true);
  };

  const closeCarousel = () => {
    setShowCarousel(false);
  };

  const toggleSearchBar = () => {
    setSearch((prevState) => !prevState);
    setSearchInput(""); // Clear search input when toggling search bar
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const editingImage =(image)=>{
    changeImageToEdit(image);
    handleToggleImageForm();
    setIsEditing(true);
  }

  // Filter images based on search input
  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {showCarousel && (
        <Carousel images={carouselImages} onClose={closeCarousel} />
      )}
      <div className={ImageLists.head} >
        <span  onClick={handleToggleShow}>
          <img src={Back} alt="Back" />
        </span>
        <h3>
          {images.length === 0
            ? `No Images in ${albumName}`
            : `Images in ${albumName}`}
        </h3>
        <div className={ImageLists.search}>
          {search ? (
            <div>
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <img src={Cancel} alt="Cancel" onClick={toggleSearchBar} className={ImageLists.cancel}/>
            </div>
          ) : (
            <img src={Search} alt="Search" onClick={toggleSearchBar} />
          )}
        </div>
        <button
          className={showImageForm ? ImageLists.clrBtn : ImageLists.addBtn}
          onClick={()=>{handleToggleImageForm();changeImageToEdit(null)}}
        >
          {showImageForm  ? "Cancel" : "Add Image"}
        </button>
      </div>
      <div className={ImageLists.imageListDiv}>
        {filteredImages.map((image) => (
          <div className={ImageLists.image} key={image.id}>
            <div className={ImageLists.edit}>
              <img src={Edit} alt="Edit" onClick={()=>{editingImage(image)}} />
            </div>
            <div className={ImageLists.delete}>
              <img
                src={Delete}
                alt="Delete"
                onClick={() => deleteImage(image.id)}
              />
            </div>
            <img src={image.imageUrl} alt="images" onClick={() => openCarousel(image)}  onError={(e) => e.target.src = Warning}className={ImageLists.warningImage}/>
            <span>{image.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ImageList;
