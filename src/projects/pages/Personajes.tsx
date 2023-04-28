import { useState, useEffect, useCallback} from 'react';
import {Container, Paper, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import ArrayCharacters from '../classes/Array/ArrayCharacter';


import CardPersonaje from '../../components/CardPersonaje';
import Paginacion from '../../components/Paginacion';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';

const Personajes = () => {

    const [ personajes, setPersonajes ] = useState<ArrayCharacters>(new ArrayCharacters);
    const [ page, setPage ] = useState<number>(1);
    const [ countPage, setCountPage ] = useState<number>(1);
    const [ name, setName ] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);
    const [ search, setSearch] = useState<string>('');
    const [ error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fetchPersonajes = async() => {
        const params: FindPageCharacterDTO = { page };
        if(page > 0){
            params.page = page;
        }else{
            params.page = 1;
        }

        if(name !== ''){
            params.name = name;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(search.trim() === name){
            return;
        }

        setName(search.trim());
        setPage(1);
        setSubmit(prev => !prev);
        
    }

    useEffect( () => {
        fetchPersonajes();
    }, [page, submit])

    return ( 
        <>
        <Container sx={{ marginTop: '1rem', maxWidth: { xs: '600px', lg: '1200px'}, marginX: 'auto' }} style={{ padding: 0 }} >
        <Box sx={{ paddingX: '20px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                    id="standard-basic" 
                    label="Nombre del Personaje" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </Box>
        {
            personajes.results.length > 0 ?
            <Paginacion page={page} setPage={setPage} countPage={countPage} >
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