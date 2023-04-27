import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Box, Typography } from '@mui/material';

import Character from '../classes/Character/Character';
import { STATUS_CHARACTER } from '../../utils/constans';


const PersonajeDetalle = () => {
    const {idPersonaje} = useParams();
    const [ personaje, setPersonaje ] = useState<Character | {}>({});

    const fetchData = async () => {
        const character = await Character.getCharacter(parseInt(idPersonaje));
        setPersonaje(character);
    }

    useEffect( () => {

        if(!Number.isNaN(parseInt(idPersonaje))){
            fetchData();
        }

    },[])


    if (personaje instanceof Character) {
        return ( 
            <Container maxWidth={'sm'} sx={{ bgcolor: 'red', mt: 2 }} style={{ padding: '4px'}}>
                <Paper elevation={3} sx={{ height: '300px', overflow: 'hidden', display: 'flex' }} style={{ position: 'relative' }}>
                    <Box sx={{ paddingX: '10px', bgcolor: STATUS_CHARACTER[`${personaje.status}`]}} style={{ position: 'absolute', top: 4, left: 4, borderRadius: '5px' }} >
                        <Typography variant='body1' component='h6' sx={{ color: '#fff', fontWeight: 700}} >{`${personaje.status} - ${personaje.species}`}</Typography>
                    </Box>
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
            </Container>
        )
    }

    return(
        <h1>Hola</h1>
    )
}

export default PersonajeDetalle;