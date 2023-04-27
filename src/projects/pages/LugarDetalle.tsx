import { useState, useEffect } from 'react'; 
import { useParams } from "react-router-dom";
import Location from '../classes/Location/Location';
import { Container, Paper, Typography, Box, Grid, CircularProgress } from '@mui/material';
import CardPersonaje from '../../components/CardPersonaje';

const LugarDetalle = () => {
    const {idLugar} = useParams();
    const [ lugar, setLugar ] = useState< Location | {} >({});
    const [ error, setError ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(false);

    const fetchLugar = async () => {
        try{
            setLoading(true);
            const  getLugar = await Location.getLocation(parseInt(idLugar));
            setLugar(getLugar);
        }catch(error){
            console.log(error);
            setError(true);
        }finally{
            setLoading(false)
        }
    }

    useEffect( () => {
        if(!Number.isNaN(parseInt(idLugar))){
            fetchLugar();
        }else{
            setError(true);
        }
    }, []);

    return ( 
        <Container maxWidth='sm' sx={{ pt: 3}}>
            {
                lugar instanceof Location && !loading && !error ? (
                <>
                <Paper elevation={16} sx={{ p: 4, mb: 3 }}>
                   <Typography variant='h3' component={'h1'}>
                    {lugar.name}
                   </Typography>
                   <Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ fontWeight: 700}}>
                            Tipo:
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            {lugar.type}
                        </Typography>
                   </Box>
                   <Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ fontWeight: 700}}>
                            Dimension:
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
                            {lugar.dimension}
                        </Typography>
                   </Box>
                </Paper>

                <Box sx={{ mb: 3}}>
                    <Typography variant='h4' component={'h2'}>
                        Personajes
                    </Typography>
                </Box>

                <Grid container sx={{marginX: 'auto', maxWidth: { xs: '600px', lg: '1200px'}, marginTop: 3}} >

                        
                        {   
                            lugar.residentsCharacter.map( personaje => <CardPersonaje key={personaje.id}  personaje={personaje} lugar={true} />)
                        }

                        
                </Grid>

                

                </>
                ) 
                :
                !loading && error ? (
                    <Box sx={{ maxWidth: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant='h6'>Sucedio un error durante la carga de datos {idLugar}</Typography>
                    </Box>
                )
                :
                (
                    <Box sx={{ maxWidth: '100%', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress size={100} />
                    </Box>
                )
            }

        </Container>
     );
}
 
export default LugarDetalle;