import { useState } from "react";
import CarouselStyle from "./Carousel.module.css";
import Warning from "../../static/images/warning.png";

function Carousel({images,onClose}){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
    return (
        <>
        <div  className={CarouselStyle.carousel}>
            <button onClick={onClose}>X</button>
            <button onClick={prevImage}>&lt;</button>
            <img  src={images[currentImageIndex].imageUrl} alt={images[currentImageIndex].title} onError={(e)=>e.target.src=Warning}/>
            <button onClick={nextImage}>&gt;</button>
        </div>
        </>
    )
}

export default Carousel;