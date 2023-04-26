import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Box, CardMedia } from '@mui/material';

import Character from '../classes/Character/Character';


const PersonajeDetalle = () => {
    const {idPersonaje} = useParams();
    const [ personaje, setPersonaje ] = useState<Character | []>([]);

    const fetchData = async () => {
        const character = await Character.getCharacter(1);console.log(character);
        setPersonaje(character);
    }

    useEffect( () => {

        if(!Number.isNaN(parseInt(idPersonaje))){
            fetchData();
        }

    },[])

    if(personaje ){console.log(personaje instanceof Character);
        return ( 
            
            <Container maxWidth={'sm'} sx={{ bgcolor: 'red', mt: 2 }} style={{ padding: '4px'}}>
                <Paper elevation={3} sx={{ height: '300px', overflow: 'hidden' }}>
                    <img src={personaje.image} alt={personaje.name} />
                    <Box>

                    </Box>
                </Paper>
            </Container>
        )
    }
}

export default PersonajeDetalle;