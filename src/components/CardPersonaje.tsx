import { Grid, Card, Box, CardContent, Typography, IconButton, CardMedia } from "@mui/material";
import Character from "../projects/classes/Character/Character";
import { STATUS_CHARACTER } from "../utils/constans";

const CardPersonaje: React.FC<IPropsCardPersonaje> = ({personaje, lugar = false}) => {
    const {id, name, image, status, species, location, seen } = personaje;
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
                        image={image}
                        alt={name}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                        <CardContent sx={{ flex: '1 0 auto', paddingY: '.5rem' }}>
                        <Typography component="div" variant="h6">
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
                        <Typography variant="body1" color="text.secondary" >
                            {location.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" mt={2} sx={{ fontWeight: 700}}>
                            Visto por primera vez:
                        </Typography>
                        <Typography variant="body1" color="text.secondary" >
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