import { useState, useEffect } from 'react';
import {Container, Paper, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import ArrayLocation from '../classes/Array/ArrayLocation';
import Paginacion from '../../components/Paginacion';
import CardLugar from '../../components/CardLugar';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';

const Lugares = () => {

    const [ lugares, setLugares ] = useState<ArrayLocation>(new ArrayLocation);
    const [ page, setPage ] = useState<number>(1);
    const [ countPage, setCountPage ] = useState<number>(1);
    const [ name, setName ] = useState<string>('');
    const [submit, setSubmit] = useState<boolean>(false);
    const [ search, setSearch] = useState<string>('');
    const [ error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchLugares = async() => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(search.trim() === name){
            return;
        }

        setName(search.trim());
        setPage(1);
        setSubmit(prev => !prev);
        
    }

    useEffect( ( ) => {
        fetchLugares();
    },[page, submit])

    return ( 
        <>
        <Container sx={{ marginTop: '1rem', maxWidth: { xs: '400px', sm: '400px', md: '800px', lg: '1200px'}, marginX: 'auto' }} style={{ padding: 0 }} >
        <Box sx={{ paddingX: '20px' }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <TextField 
                    id="standard-basic" 
                    label="Nombre del Lugar" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </Box>
        {
            lugares.results.length > 0 ?
            <Paginacion page={page} setPage={setPage} countPage={countPage} >
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