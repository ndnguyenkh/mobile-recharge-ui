
import { Box, Typography } from "@mui/material";
import ImageSlider from "~/components/ImageSlider";
import DataImages from "~/utils/DataImages";
import SessionService from "./SessionService";
import Contact from "~/components/Contact";
import About from "~/components/About";

const Home = () => {


    return ( 
        <Box sx={{mx: 10}}>
            <Typography variant="h6" sx={{color: 'gray'}}>Home</Typography>

            {/* slides */}
            <Box
                sx={{width: '100%', height: '480px', margin: '0 auto'}}
            >
                <ImageSlider slides={DataImages.slides} />
            </Box>

            {/* session 1 */}
            <SessionService />

            {/* session 2 */}
            <Contact />

            {/* session 3 */}
            <About />
        </Box>
     );
}
 
export default Home;