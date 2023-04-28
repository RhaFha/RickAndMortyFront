import { useState, useEffect, useCallback} from 'react';
import {Container, Paper, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import ArrayCharacters from '../classes/Array/ArrayCharacter';
import { useSearchParams } from 'react-router-dom';

import { ifNaN } from '../../utils/functions';
import CardPersonaje from '../../components/CardPersonaje';
import Paginacion from '../../components/Paginacion';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';

const Personajes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ personajes, setPersonajes ] = useState<ArrayCharacters>(new ArrayCharacters);
    const [ countPage, setCountPage ] = useState<number>(1);
    const [ error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fetchPersonajes = async() => {
        const params: FindPageCharacterDTO = {};
        if( searchParams.get('page') ?? '' !== ''){
            params.page = parseInt(searchParams.get('page'));
        }else{
            params.page = 1;
        }

        if(searchParams.get('search') ?? '' !== ''){
            params.name = searchParams.get('search');
        }

        try{
            setLoading(true);
            const arrayPersonajes = await ArrayCharacters.getCharacters(params);

            setPersonajes(arrayPersonajes);
            setCountPage(arrayPersonajes.info.pages);
            
        }catch(error){
            if (error.response) {
                // El servidor respondió con un estado diferente de 200
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.data.error){
                    setError(error.response.data.error);
                    setPersonajes(new ArrayCharacters);
                    setCountPage(0);
                }
              } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                console.log(error.request);
              } else {
                // Algo sucedió en la configuración de la solicitud que provocó que se lanzara un error
                console.log('Error', error.message);
              }
        } finally{
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setSearchParams({ search: e.currentTarget.search.value.trim(), page: '1' })
        
    }

    const handleChangePage = (page: number) => {
        const params = Object.fromEntries([...searchParams]);
        setSearchParams({ ...params, page: page.toString() });
    }

    useEffect( () => {
        fetchPersonajes();
    }, [searchParams])

    return ( 
        <>
        <Container sx={{ marginTop: '1rem', maxWidth: { xs: '600px', lg: '1200px'}, marginX: 'auto' }} style={{ padding: 0 }} >
        <Box sx={{ paddingX: '20px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                    id="search" 
                    name="search"
                    label="Nombre del Personaje" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    defaultValue={searchParams.get('search') ?? ''}
                    
                />
            </form>
        </Box>
        {
            personajes.results.length > 0 ?
            <Paginacion page={ifNaN(searchParams.get('page'))} setPage={handleChangePage} countPage={countPage} >
                    <Grid container sx={{marginX: 'auto', maxWidth: { xs: '600px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   loading ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginY: '3rem' }}>
                                        <CircularProgress />
                                    </Box>
                            :
                            personajes.results.map( personaje => <CardPersonaje key={personaje.id}  personaje={personaje} />)
                        }

                        
                </Grid>
            </Paginacion>
            :
            
                <Typography align='center' mt={2} variant='h6'>{error}</Typography>
        }
        </Container>
        
        </>
       
     );
}
 
export default Personajes;