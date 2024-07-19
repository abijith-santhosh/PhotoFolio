import ImageForms from "./ImageForm.module.css";
import {useEffect, useRef} from "react";
function ImageForm({ addImage,imageToUpdate,resetImageToUpdate, isEditing,updateImage,setShowImageForm,selectedAlbumId }) {
  const titleInputRef = useRef();
  const imageUrlInputRef = useRef();

  useEffect(()=>{
    if(!imageToUpdate) return;
    titleInputRef.current.value = imageToUpdate.title;
    imageUrlInputRef.current.value = imageToUpdate.imageUrl;
    titleInputRef.current.focus();
  },[imageToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = titleInputRef.current.value;
    const imageUrl = imageUrlInputRef.current.value;
    
    if (!imageToUpdate) {
      const image = {
         title,
        imageUrl,
        albumId:selectedAlbumId
      };
      addImage(image, selectedAlbumId);
      setShowImageForm(false);
      clearInput();
      return;
    }

    const image = {
      title,
      imageUrl: imageUrl,
      albumId:selectedAlbumId,
      id: imageToUpdate.id,
      updatedAt:new Date().toLocaleString()
    };

    const result = updateImage(imageToUpdate.id, image);
    setShowImageForm(false);
    if (!result) return;
    clearInput();
    resetImageToUpdate();
  };

  const clearInput = ()=>{
    titleInputRef.current.value="";
    imageUrlInputRef.current.value="";
  }
    return (
        <>
            <div className={ImageForms.imageForm}>
                <span></span>
                <form onSubmit={onSubmitHandler}>
                    <input type="text" 
                    name="title"
                    placeholder="Title" 
                    ref={titleInputRef}
                    required
                    />
                    <input type="text"
                      name="imageUrl"
                      placeholder="Image URL"
                      ref={imageUrlInputRef}
                      required  
                       />
                    <div className={ImageForms.buttonsDiv}>
                    <button type="button" className={ImageForms.clrBtn} onClick={clearInput}>Clear</button>
                    <button type="submit" className={ImageForms.addBtn}>{isEditing ? 'Update Image' : 'Add Image'}</button>
                    </div>
                </form>
                
            </div>
        </>
    );
}

export default ImageForm;