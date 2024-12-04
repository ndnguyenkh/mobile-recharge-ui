
import { Box, Container, Typography } from "@mui/material";

function Error() {
    return ( 
        <Box sx={{width: '100%', height: '80vh', py: 20}}>
            <Container sx={{display: 'flex', justifyContent: 'center'}}>
                <Box sx={{textAlign: 'center', fontWeight: 'bold', px: {md: 10, xs: 0}}}>
                    <Typography fontWeight={'bold'}>ERREUR 404</Typography>
                    <Typography sx={{fontSize: {md: '80px', xs: '30px'}}}>PAGE NON TROUVÉE</Typography>
                    <Typography sx={{px: {md: 15, xs: 12}, fontSize: {md: '24px', xs: '18px'}}} >
                        Nous n’avons pas trouvé la page que vous recherchez. Veuillez vérifier à nouveau l’adresse, utiliser le menu de navigation ci-dessus ou consulter le contenu ci-dessous.
                    </Typography>
                </Box>
            </Container>
        </Box>
     );
}

export default Error;