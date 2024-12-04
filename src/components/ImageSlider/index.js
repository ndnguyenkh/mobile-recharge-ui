import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const ImageSlider = ({ slides }) => {

    // value index
    const [currentIndex, setCurrentIndex] = useState(0);

    // pre
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // next
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        // Set an interval to go to the next slide every 10 seconds
        const intervalId = setInterval(goToNext, 10000);

        // Cleanup the interval when component is unmounted
        return () => clearInterval(intervalId);
    }, [currentIndex]); // Re-run the effect when currentIndex changes

    return (
        <Box sx={{
            height: '100%',
            position: 'relative'
        }}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(0, -50%)',
                left: '32px',
                fontSize: '45px',
                color: '#fff',
                zIndex: 1,
                cursor: 'pointer',
                ":hover": {
                    fontSize: '50px',
                    color: 'gray'
                }
            }}
                onClick={goToPrevious}>
                ❰
            </Box>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translate(0, -50%)',
                right: '32px',
                fontSize: '45px',
                color: '#fff',
                zIndex: 1,
                cursor: 'pointer',
                ":hover": {
                    fontSize: '50px',
                    color: 'gray'
                }
            }}
                onClick={goToNext}>
                ❱
            </Box>

            {/* Các ảnh được chồng lên nhau với hiệu ứng chuyển ảnh mượt mà */}
            <Box sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '5px',
                overflow: 'hidden' // Ẩn các phần vượt quá của ảnh
            }}>
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundImage: `url('${slide.url}')`,
                            opacity: currentIndex === index ? 1 : 0, // Ảnh hiện tại có opacity = 1, các ảnh còn lại có opacity = 0
                            transition: 'opacity 1s ease-in-out', // Hiệu ứng mờ dần
                        }}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                    // marginTop: '10px',
                }}
            >
                {slides.map((slide, index) => (
                    <Box
                        key={index}
                        sx={{
                            margin: '0 3px',
                            cursor: 'pointer',
                            fontSize: currentIndex === index ? '30px' : '20px',
                            color: currentIndex === index ? 'grey' : 'gray',
                        }}
                        onClick={() => goToSlide(index)}
                    >
                        ●
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default ImageSlider;
