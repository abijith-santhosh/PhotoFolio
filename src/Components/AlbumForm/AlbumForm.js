
import AlbumStyle from "./Album.module.css";
import { useEffect, useRef } from "react";

function AlbumForm({ addAlbum, albumName, setAlbumName,setShowAlbumForm }) {

  const albumTextInput = useRef();
    useEffect(()=>{
      if(setShowAlbumForm){
        albumTextInput.current.focus();
      }
    })
    
      const handleChange = (e) => {
        setAlbumName(e.target.value);
      };
      const submitHandler =(e)=>{
        e.preventDefault();
        const albumText = albumTextInput.current.value;
        const album ={name:albumText,createdAt:new Date().toLocaleDateString()};
        addAlbum(album);
        clearInput();
        setShowAlbumForm(false);
        return;
      }
      const clearInput = ()=>{
        albumTextInput.current.value = "";
      }

  return (
    <>
      <div className={AlbumStyle.albumFormDiv}>
        <span>Create an album</span>
        <form className={AlbumStyle.albumForm} onSubmit={submitHandler}>
          <input type="text" 
          placeholder="Album Name"
          value={albumName} 
          onChange={handleChange}
          ref={albumTextInput}
          required></input>
          <button className={AlbumStyle.clrBtn} type="button" onClick={clearInput}>Clear</button>
          <button className={AlbumStyle.addBtn} type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default AlbumForm;
