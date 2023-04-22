import InfoDTO from "./DTOs/InfoDTO";
import Character from "../Character/Character";
import FindPageCharacterDTO from "./DTOs/FindPageCharacterDTO";
import RickAndMortyClient from "../RickAndMortyClient";


const instancia = new RickAndMortyClient('/character').getAxiosInstance();
export default class ArrayCharacters {
    info: InfoDTO;
    results: Array<Character>;
    error?: string;

    constructor(
        ArrayCharacters?: ArrayCharacters,
        _error?: string,
        _info: InfoDTO = new InfoDTO(),
        _results: Array<Character> = [],

    ) {
        if (ArrayCharacters) {
            this.info = ArrayCharacters.info;
            this.results = ArrayCharacters.results;
        } else if (_error) {
            this.info = _info;
            this.results = _results;
            this.error = _error;
        } else {
            this.info = _info;
            this.results = _results;
        }
    }

    public static async getCharacters(params: FindPageCharacterDTO = { page: 1 }) {
        const respuesta = await instancia.get('', {
            params
        });
        return new ArrayCharacters(respuesta.data);
    }
}