import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Box, Typography, Grid, CircularProgress } from '@mui/material';

import Character from '../classes/Character/Character';
import { STATUS_CHARACTER } from '../../utils/constans';
import CardEpisodio from '../../components/CardEpisodio';

const PersonajeDetalle = () => {
    const {idPersonaje} = useParams();
    const [ personaje, setPersonaje ] = useState<Character | {}>({});
    const [ loading, setLoading ] = useState<boolean>( false );
    const [ error , setError ] = useState<boolean>(false);

    const fetchData = async () => {
        try{
            setLoading(true);
            const character = await Character.getCharacter(parseInt(idPersonaje));
            setPersonaje(character);
        }catch (error){
            console.log(error);
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    useEffect( () => {

        if(!Number.isNaN(parseInt(idPersonaje))){
            fetchData();
        }else{
            setError(true);
        }

    },[])


    if (personaje instanceof Character && !loading && !error) {
        return ( 
            <Container maxWidth={'sm'} sx={{mt: 3 }} style={{ padding: '0px'}}>
                <Paper elevation={16} sx={{ height: '300px', overflow: 'hidden', display: 'flex', mb: 3 }} style={{ position: 'relative' }}>
                    <Paper elevation={16} sx={{ paddingX: '10px', bgcolor: STATUS_CHARACTER[`${personaje.status}`]}} style={{ position: 'absolute', top: 4, left: 4, borderRadius: '10px' }} >
                        <Typography variant='body1' component='h6' sx={{ color: '#fff', fontWeight: 700}} >{`${personaje.status} - ${personaje.species}`}</Typography>
                    </Paper>
                    <img src={personaje.image} alt={personaje.name} style={{ width: '250px' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1}}>
                        <Typography variant='h5' component='h1' sx={{ fontWeight: 900}} >{personaje.name}</Typography>
                        <Box>
                            <Typography variant='h6' component='h6'>Tipo:</Typography>
                            <Typography variant='body1' component='h6'>{ personaje.type === "" ? "Desconocido" : personaje.type}</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' component='h6'>Genero:</Typography>
                            <Typography variant='body1' component='h6'>{ personaje.gender }</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' component='h6'>Origen:</Typography>
                            <Typography variant='body1' component='h6'>{ personaje.origin.name }</Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' component='h6'>Ubicación:</Typography>
                            <Typography variant='body1' component='h6'>{ personaje.location.name }</Typography>
                        </Box>

                    </Box>
                </Paper>

                <Box>
                    <Typography variant='h4' component={'h2'}>
                        Episodios
                    </Typography>
                </Box>

                <Grid container sx={{marginX: 'auto', maxWidth: { xs: '600px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   
                            personaje.seen.map( episodio => <CardEpisodio key={episodio.id} episodio={episodio} character={true} />)
                        }

                        
                </Grid>

            </Container>
        )
    }else if(!loading && error){
    return(<Container maxWidth={'sm'}  sx={{mt: 2, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ padding: '0px'}}>
                <Typography variant='h6'>Sucedio un error durante la carga de datos {idPersonaje}</Typography>
            </Container>);
    }

    return(
        <Container maxWidth={'sm'}  sx={{mt: 2, height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }} style={{ padding: '0px'}}>
            <CircularProgress size={100} />
        </Container>
    )
}

export default PersonajeDetalle;