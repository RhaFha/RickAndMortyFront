import { useState, useEffect } from "react";
import { Container, Grid, CircularProgress, Box, Typography } from '@mui/material';

import ArrayCharacters from "../classes/Array/ArrayCharacter";
import CardPersonaje from "../../components/CardPersonaje";
import Character from "../classes/Character/Character";



const Home = () => {
    const [ personajes, setPersonajes ] = useState<ArrayCharacters>(new ArrayCharacters);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');

    const getPage = (minNumber: number,maxNumber: number) => {
        return Math.floor((Math.random() * (maxNumber - minNumber + 1)) + minNumber);
    }

    const getSix = (personajes: Array<Character>) => {
        let six: Character[] = []
        if( personajes.length <= 6){

            return personajes;
        }

        for (let i = 0; i < 6; i++) {
            let indice = Math.floor(Math.random() * personajes.length);
            six.push(personajes[indice]);
            personajes.splice(indice, 1);
          }
        return six;
    }


    const fetchPersonajes = async() => {
        try{
            setLoading(true);
            const personajesLigth = await ArrayCharacters.getCharactersLigth({page:1});
            const page = getPage(1, personajesLigth.info.pages);
            const getPersonajes = await ArrayCharacters.getCharacters({page});
            const getSixPersonajes = getSix(getPersonajes.results);
            getPersonajes.results = getSixPersonajes;
            setPersonajes(getPersonajes);
        }catch(error){

        }finally{
            setLoading(false);
        }
    }

    useEffect( () => {
        fetchPersonajes();
    },[])

    return (

            <Container sx={{ marginTop: '1rem', maxWidth: { xs: '600px', lg: '1200px'}, marginX: 'auto' }} style={{ padding: 0 }} >
                {
            personajes.results.length > 0 ?

                    <Grid container sx={{marginX: 'auto', maxWidth: { xs: '600px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   loading ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginY: '3rem' }}>
                                        <CircularProgress />
                                    </Box>
                            :
                            personajes.results.map( personaje => <CardPersonaje key={personaje.id}  personaje={personaje} />)
                        }

                        
                </Grid>

            :
            
                <Typography align='center' mt={2} variant='h6'>{error}</Typography>
        }
            </Container>
        

    )
}

export default Home;