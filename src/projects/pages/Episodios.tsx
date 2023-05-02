import { useState, useEffect } from 'react';
import {Container, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { ifNaN } from '../../utils/functions';
import ArrayEpisode from '../classes/Array/ArrayEpisode';
import Paginacion from '../../components/Paginacion';
import CardEpisodio from '../../components/CardEpisodio';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';
import { AxiosError } from 'axios';

const Episodios = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ episodios, setEpisodios ] = useState<ArrayEpisode>(new ArrayEpisode);
    const [ countPage, setCountPage ] = useState<number>(1);
    const [ error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLugares = async() => {
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
            const arrayLugares = await ArrayEpisode.getLocations(params);
            setEpisodios(arrayLugares);
            setCountPage(arrayLugares.info.pages);
        }catch(error){
            
            if( error instanceof AxiosError ){

                if (error.response) {
                    // El servidor respondió con un estado diferente de 200
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    if(error.response?.data?.error){
                        setError(error.response.data.error);
                        setEpisodios(new ArrayEpisode);
                        setCountPage(0);
                    }
                  } else if (error.request) {
                    // La solicitud fue hecha pero no hubo respuesta
                    console.log(error.request);
                  } else {
                    // Algo sucedió en la configuración de la solicitud que provocó que se lanzara un error
                    console.log('Error', error.message);
                  }

            }
            

        }finally{
            setLoading(false);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setSearchParams({ search: e.currentTarget.search.value.trim(), page: '1' })
    }

    const handleChangePage = (page: number) => {
        const params = Object.fromEntries([...searchParams]);
        setSearchParams({ ...params, page: page.toString() });
    }

    useEffect( ( ) => {
        fetchLugares();
    },[searchParams])

    return ( 
        <>
        <Container sx={{ marginTop: '1rem', maxWidth: { xs: '400px', sm: '400px', md: '800px', lg: '1200px'}, marginX: 'auto' }} style={{ padding: 0 }} >
        <Box sx={{ paddingX: '20px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                    id="search"
                    name="search" 
                    label="Nombre del Episodio" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    defaultValue={searchParams.get('search')}
                />
            </form>
        </Box>
        {
            episodios.results.length > 0 ?
            <Paginacion page={ifNaN(searchParams.get('page'))} setPage={handleChangePage} countPage={countPage} >
                    <Grid container sx={{marginX: 'auto', maxWidth: { xs: '400px', sm: '400px', md: '800px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   loading ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginY: '3rem' }}>
                                        <CircularProgress />
                                    </Box>
                            :
                            episodios.results.map( episodio => <CardEpisodio key={episodio.id} episodio={episodio}/>)
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
 
export default Episodios;