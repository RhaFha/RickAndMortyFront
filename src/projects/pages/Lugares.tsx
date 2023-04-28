import { useState, useEffect } from 'react';
import {Container, Paper, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { ifNaN } from '../../utils/functions';
import ArrayLocation from '../classes/Array/ArrayLocation';
import Paginacion from '../../components/Paginacion';
import CardLugar from '../../components/CardLugar';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';

const Lugares = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ lugares, setLugares ] = useState<ArrayLocation>(new ArrayLocation);
    const [ page, setPage ] = useState<number>(1);
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
            const arrayLugares = await ArrayLocation.getLocations(params);
            setLugares(arrayLugares);
            setCountPage(arrayLugares.info.pages);
        }catch(error){
            if (error.response) {
                // El servidor respondió con un estado diferente de 200
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.data.error){
                    setError(error.response.data.error);
                    setLugares(new ArrayLocation);
                    setCountPage(0);
                }
              } else if (error.request) {
                // La solicitud fue hecha pero no hubo respuesta
                console.log(error.request);
              } else {
                // Algo sucedió en la configuración de la solicitud que provocó que se lanzara un error
                console.log('Error', error.message);
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
                    label="Nombre del Lugar" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    defaultValue={ searchParams.get('search') ?? ''}
                />
            </form>
        </Box>
        {
            lugares.results.length > 0 ?
            <Paginacion page={ifNaN(searchParams.get('page'))} setPage={handleChangePage} countPage={countPage} >
                    <Grid container sx={{marginX: 'auto', maxWidth: { xs: '400px', sm: '400px', md: '800px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   loading ? <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', marginY: '3rem' }}>
                                        <CircularProgress />
                                    </Box>
                            :
                            lugares.results.map( lugar => <CardLugar key={lugar.id} lugar={lugar}/>)
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
 
export default Lugares;