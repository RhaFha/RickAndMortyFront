import { useState, useEffect } from 'react';
import ArrayLocation from '../classes/Array/ArrayLocation';

const Lugares = () => {

    const [ lugares, setLugares ] = useState<ArrayLocation>(new ArrayLocation);
    const [ page ,setPage ] = useState<number>(1);

    const fetchLugares = async() => {
        const arrayLugares = await ArrayLocation.getLocations({page});console.log(arrayLugares);
    }

    useEffect( ( ) => {
        fetchLugares();
    },[page])

    return ( 
        <h1>Lugares</h1>
     );
}
 
export default Lugares;