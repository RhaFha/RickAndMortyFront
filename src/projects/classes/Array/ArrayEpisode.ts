import InfoDTO from "./DTOs/InfoDTO";
import Episode from "../Episode/Episode";
import FindPageCharacterDTO from "../Array/DTOs/FindPageCharacterDTO";
import RickAndMortyClient from "../RickAndMortyClient";

const instancia = new RickAndMortyClient('/episode').getAxiosInstance();
export default class ArrayEpisode {
    info: InfoDTO;
    results: Array<Episode>;

    constructor(
        _info: InfoDTO = new InfoDTO(),
        _results: Array<Episode> = [],
    ) {
        this.info = _info;
        this.results = _results;
    }

    public static async getLocations(params: FindPageCharacterDTO) {
        const respuesta = await instancia.get('', {
            params
        });
        return respuesta.data;
    }
}