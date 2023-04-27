import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Paper, Grid, CircularProgress } from "@mui/material";

import Episode from "../classes/Episode/Episode";
import CardPersonaje from "../../components/CardPersonaje";


const EpisodioDetalle = () => {
    const { idEpisodio } = useParams();
    const [ episodio, setEpisodio ] = useState<Episode | {}>({});
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);

    const fetchEpisodio = async () => {
        try{
            setLoading(true);
            const getEpisodio = await Episode.getEpisode(parseInt(idEpisodio), true);
            setEpisodio(getEpisodio);

        }catch(error){
            console.log(error);
            setError(true);

        }finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        if(!Number.isNaN(parseInt(idEpisodio))){
            fetchEpisodio();
        }else{
            setError(true);
        }

    },[])


    return ( 
        <Container maxWidth='sm' sx={{ pt: 3}}>
            {
                episodio instanceof Episode && !loading && !error ? (
                <>
                <Paper elevation={16} sx={{ p: 4, mb: 3 }}>
                   <Typography variant='h3' component={'h1'}>
                    {episodio.name}
                   </Typography>
                   
                    <Typography variant="body1" color="text.secondary" >
                    {episodio.episode} - {episodio.air_date}
                    </Typography>
                   
                </Paper>

                <Box sx={{ mb: 3}}>
                    <Typography variant='h4' component={'h2'}>
                        Personajes
                    </Typography>
                </Box>

                <Grid container sx={{marginX: 'auto', maxWidth: { xs: '600px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   
                            episodio.objectsCharacter.map( personaje => <CardPersonaje key={personaje.id}  personaje={personaje} lugar={true} />)
                        }

                        
                </Grid>

                

                </>
                ) 
                :
                !loading && error ? (
                    <Box sx={{ maxWidth: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant='h6'>Sucedio un error durante la carga de datos {idEpisodio}</Typography>
                    </Box>
                )
                :
                (
                    <Box sx={{ maxWidth: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress size={100} />
                    </Box>
                )
            }

        </Container>
     );
}
 
export default EpisodioDetalle;