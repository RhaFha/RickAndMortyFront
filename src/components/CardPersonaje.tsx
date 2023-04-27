import { useState } from 'react';
import { Grid, Card, Box, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Character from "../projects/classes/Character/Character";
import { STATUS_CHARACTER } from "../utils/constans";
import styles from '../styles/Link.module.css';
import defaultImage from '../../public/img/imageDefault.jpeg';

const CardPersonaje: React.FC<IPropsCardPersonaje> = ({personaje, lugar = false}) => {
    const {id, name, image, status, species, location, seen } = personaje;
    const idLocation = location.url.split('/');
    const [ isImageLoaded, setIsImageLoaded ] = useState<boolean>(false);
    let lg = 6;

    if(lugar){
       lg= 12;
    }
    return ( 
        <Grid item xs={12} lg={lg} style={{ padding: 0, paddingTop: '.05rem', paddingBottom: '0.5rem'  }}>
                <Card sx={{ display: 'flex', width: '560px', marginX: 'auto' }} style={{ backgroundColor: '#FFF' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image={isImageLoaded ? image : defaultImage}
                        alt={name}
                        onError={() => setIsImageLoaded(false)}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingY: '.5rem' }}>
                        <Typography component={Link} to={`/personaje/${id}`} variant="h6" className={styles.link} sx={{ color: 'inherit', textDecoration: 'none',}} >
                            {name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                            <Box sx={{ width: '10px', height: '10px', bgcolor: STATUS_CHARACTER[`${status}`], borderRadius: '50%'}} />
                            <Typography component="div" variant="body1">
                                {`${status} - ${species}`}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ fontWeight: 700}}>
                            Ultima localización conocida:
                        </Typography>
                        {
                            location.name === 'unknown' ? 
                            <Typography  variant="body1" color="text.secondary">
                                {location.name}
                            </Typography>
                            :
                            <Typography component={Link} to={`/lugar/${idLocation[idLocation.length - 1]}`} variant="body1" color="text.secondary" className={styles.link} sx={{ color: 'inherit', textDecoration: 'none',}}>
                                {location.name}
                            </Typography>
                        }
                        
                        <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ fontWeight: 700}}>
                            Visto por primera vez:
                        </Typography>
                        <Typography component={Link} to={`/episodio/${seen[0].id}`} variant="body1" color="text.secondary" className={styles.link} sx={{ color: 'inherit', textDecoration: 'none',}}>
                            {seen[0].name}
                        </Typography>
                        </CardContent>
                    </Box>
                    
                </Card>
        </Grid>
     );
}
 
export default CardPersonaje;

interface IPropsCardPersonaje{
    personaje: Character;
    lugar?: boolean;
}