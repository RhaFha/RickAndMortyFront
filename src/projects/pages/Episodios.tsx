import { useState, useEffect } from 'react';
import {Container, Paper, Box, Grid, TextField, Typography, CircularProgress} from '@mui/material';
import ArrayEpisode from '../classes/Array/ArrayEpisode';
import Paginacion from '../../components/Paginacion';
import CardEpisodio from '../../components/CardEpisodio';
import FindPageCharacterDTO from '../classes/Array/DTOs/FindPageCharacterDTO';

const Episodios = () => {
    const [ episodios, setEpisodios ] = useState<ArrayEpisode>(new ArrayEpisode);
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
            const arrayLugares = await ArrayEpisode.getLocations(params);
            setEpisodios(arrayLugares);
            setCountPage(arrayLugares.info.pages);
        }catch{

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
                    label="Nombre del Episodio" 
                    variant="outlined" 
                    fullWidth sx={{ boxShadow: 1 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </Box>
        {
            episodios.results.length > 0 ?
            <Paginacion page={page} setPage={setPage} countPage={countPage} >
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