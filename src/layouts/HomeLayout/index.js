
import { Box } from "@mui/material";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ToTop from "~/components/ToTop";

const HomeLayout = ({ children }) => {
    return ( 
        <div>
            <Box>
                <Header />
                <div>{children}</div>
                <Footer />
            </Box>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <ToTop />
        </div>
     );
}
 
export default HomeLayout;