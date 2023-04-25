import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Episode from '../projects/classes/Episode/Episode';

const CardEpisodio: React.FC<IPropsEpisodio> = ({episodio}) => {
    const {id, name, air_date, episode, characters, url, created} = episodio;
    return(
        <Grid item xs ={12} sm={12} md={6} lg={4} padding={1}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ height: 65 }}>
                    {name}
                    </Typography>
                    {/* <Typography  color="text.secondary">
                    Type:
                    </Typography> */}
                    <Typography variant="body2">
                    {episode} - {air_date}
                    </Typography>
                    {/* <Typography  color="text.secondary">
                    Dimension:
                    </Typography> */}
                    {/* <Typography sx={{ mb: 1.5 }} variant="body2">
                    {dimension}
                    </Typography> */}
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardEpisodio;

interface IPropsEpisodio {
    episodio: Episode;
}