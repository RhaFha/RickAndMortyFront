import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Character from '../classes/Character/Character';


const PersonajeDetalle = () => {
    const {idPersonaje} = useParams();
    const [ personaje, setPersonaje ] = useState<Character | []>([]);

    const fetchData = async () => {
        const character = await Character.getCharacter(1);
        setPersonaje(character);
    }

    useEffect( () => {

        if(!Number.isNaN(parseInt(idPersonaje))){
            fetchData();
        }

    },[])
    return ( 
        <h1>{idPersonaje}</h1>
    )
}

export default PersonajeDetalle;