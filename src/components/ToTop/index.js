
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import EjectIcon from '@mui/icons-material/Eject';
import NavigationIcon from '@mui/icons-material/Navigation';

const ToTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // show to top
        const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true); // show button when height > 300px
        } else {
            setIsVisible(false);// hire button when height < 300px
        }
        };

        // action
        window.addEventListener('scroll', handleScroll);

        // clear component when unmount
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // to top
    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth', // Cuộn mượt mà
        });
    };

    return ( 
        isVisible && (
            <Button
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    border: 'none',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
            >
                <NavigationIcon sx={{width: '100%', height: '100%', color: 'pink'}} />
            </Button>
        )
     );
}
 
export default ToTop;