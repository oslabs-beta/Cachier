import React, {useState} from "react";

const ImageSlider = (props) => {
    const [currentIndex, setCurrentUser] = useState(0);
    const {slides} = props;

    const sliderStyles = {
        height: "100%",
        position: "relative",
    }

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`,
    }

    return (
        <div style={sliderStyles}>
            <div style={slideStyles}>ImageSlider</div>
        </div>
    );
}

export default ImageSlider;