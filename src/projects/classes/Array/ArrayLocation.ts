import FindPageLocationDTO from "./DTOs/FindPageLocationDTO";
import InfoDTO from "./DTOs/InfoDTO";
import RickAndMortyClient from "../RickAndMortyClient";


const instancia = new RickAndMortyClient('/location').getAxiosInstance();
export default class ArrayLocation{
    info: InfoDTO;
    results: Array<Location>;

    constructor(
        ArrayLocation?: ArrayLocation,
        _info: InfoDTO = new InfoDTO(),
        _results: Array<Location> = [],
    ){
        if(ArrayLocation){
            this.info = ArrayLocation.info;
            this.results = ArrayLocation.results;
        }else{
            this.info = _info;
            this.results = _results;
        }
    }

    public static async getLocations(params: FindPageLocationDTO = { page: 1 }) {
        const respuesta = await instancia.get('', {
            params
        });console.log(respuesta.data)
        return new ArrayLocation(respuesta.data);
    }
}