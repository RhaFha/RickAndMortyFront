import { Grid, Card, Box, CardContent, Typography, IconButton, CardMedia } from "@mui/material";
import Character from "../projects/classes/Character/Character";

const CardPersonaje: React.FC<IPropsCardPersonaje> = ({personaje}) => {
    const {id, name, image, status, species} = personaje;
    return ( 
        <Grid item xs={12} lg={6} style={{ padding: 0, paddingTop: '.05rem', paddingBottom: '0.5rem'  }}>
                <Card sx={{ display: 'flex', width: '560px', marginX: 'auto' }} style={{ backgroundColor: '#FFF' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 200 }}
                        image={image}
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingY: '.5rem' }}>
                        <Typography component="div" variant="h6">
                            {name}
                        </Typography>
                        <Typography component="div" variant="body1">
                            {`${status} - ${species}`}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Mac Miller
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
}