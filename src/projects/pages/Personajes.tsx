import { useState, useEffect, useCallback} from 'react';
import {Container} from '@mui/material';
import ArrayCharacters from '../classes/Array/ArrayCharacter';

const Personajes = () => {

    const [ personajes, setPersonajes ] = useState<ArrayCharacters>(new ArrayCharacters);
    const [ page, setPage ] = useState<number>(1);

    useEffect( () => {
        const fetchPersonajes = async() => {
            try{
                const arrayPersonajes = await ArrayCharacters.getCharacters({page});
                setPersonajes(arrayPersonajes);
            }catch(error){
                console.log(error);
            } 
        }

        fetchPersonajes();

    }, [page])

    console.log(personajes);
    return ( 
        <Container fixed sx={{ border: '1px solid black', marginTop: '1rem'}} >
            hola
        </Container>
     );
}
 
export default Personajes;