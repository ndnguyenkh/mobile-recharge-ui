
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import EjectIcon from '@mui/icons-material/Eject';

const ToTop = () => {

    // State để theo dõi vị trí cuộn của trang
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Hàm kiểm tra vị trí cuộn khi người dùng cuộn trang
        const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true); // Hiển thị nút khi cuộn vượt quá 300px
        } else {
            setIsVisible(false); // Ẩn nút khi cuộn ít hơn 300px
        }
        };

        // Lắng nghe sự kiện cuộn
        window.addEventListener('scroll', handleScroll);

        // Dọn dẹp khi component bị unmount
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Hàm cuộn lên đầu trang khi nhấn nút
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
                <EjectIcon sx={{width: '100%', height: '100%', color: 'black'}} />
            </Button>
        )
     );
}
 
export default ToTop;