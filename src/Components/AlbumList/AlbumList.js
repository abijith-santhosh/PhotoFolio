import AlbumStyle from "./AlbumList.module.css";
import AlbumCover from "../../static/images/albumCover.png";

function AlbumList({
  albums,
  handleToggleAlbumForm,
  showAlbumForm,
  handleToggleShow,
  setSelectedAlbumId,
  setAlbumName,
}) {
  const handleAlbumClick = (album) => {
    setSelectedAlbumId(album.id);
    setAlbumName(album.name);
    console.log("Selected albumId: ", album.id);
    // console.log('Album',album);
    handleToggleShow();
  };
  console.log("Albums:-", albums);
  return (
    <div>
      <div className={AlbumStyle.albumList}>
        <h2>Your Albums </h2>
        <button
          onClick={handleToggleAlbumForm}
          className={showAlbumForm ? AlbumStyle.clrBtn : AlbumStyle.addBtn}
        >
          {showAlbumForm ? "Cancel" : "Add Album"}
        </button>
      </div>
      <div className={AlbumStyle.albumsContainer}>
        {albums.map((album) => (
          <div
            key={album.id}
            className={AlbumStyle.albums}
            onClick={() => handleAlbumClick(album)}
          >
            <img src={AlbumCover} alt="albumCover" />
            <span>{album.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
