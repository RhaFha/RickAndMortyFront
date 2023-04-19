import { Grid, Card, Box, CardContent, Typography, IconButton, CardMedia } from "@mui/material";
import Character from "../projects/classes/Character/Character";

const CardPersonaje: React.FC<IPropsCardPersonaje> = ({personaje}) => {
    const {id, name, image} = personaje;
    return ( 
        <Grid item xs={12} md={6} lg={4}>
                <Card sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={image}
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Live From Space
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