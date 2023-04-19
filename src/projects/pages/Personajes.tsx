import { useState, useEffect, useCallback} from 'react';
import {Container, Paper, Box, Grid} from '@mui/material';
import ArrayCharacters from '../classes/Array/ArrayCharacter';
import style from '../../styles/grid.module.css';

import CardPersonaje from '../../components/CardPersonaje';

const Personajes = () => {

    const [ personajes, setPersonajes ] = useState<ArrayCharacters>(new ArrayCharacters);
    const [ page, setPage ] = useState<number>(1);

    const fetchPersonajes = async() => {
        try{
            const arrayPersonajes = await ArrayCharacters.getCharacters({page});
            setPersonajes(arrayPersonajes);
        }catch(error){
            console.log(error);
        } 
    };

    useEffect( () => {
        fetchPersonajes();
    }, [page])

    
    return ( 
        <>
        <Container fixed sx={{ border: '1px solid black', marginTop: '1rem'}} >
            hola
            <Grid container spacing={2} >

                
                {
                    personajes.results.map( personaje => <CardPersonaje key={personaje.id}  personaje={personaje} />)
                }

                
            </Grid>
        </Container>
        
        </>
       
     );
}
 
export default Personajes;