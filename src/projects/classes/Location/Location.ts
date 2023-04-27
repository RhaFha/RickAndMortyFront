import Character from "../Character/Character";
import RickAndMortyClient from "../RickAndMortyClient";

const instancia = new RickAndMortyClient('/location').getAxiosInstance();
export class Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Array<string>;
    url: string;
    created: string;
    residentsCharacter?: Array<Character>;

    constructor(
        _id: number = 0,
        _name: string = '',
        _type: string = '',
        _dimension: string = '',
        _residents: Array<string> = [],
        _url: string,
        _created: string,
        _residentsChracters?: Array<Character>,
    ) {
        this.id = _id;
        this.name = _name;
        this.type = _type;
        this.dimension = _dimension;
        this.residents = _residents;
        this.url = _url;
        this.created = _created;

        if (_residentsChracters) {
            this.residentsCharacter = _residentsChracters;
        }
    }

    public static async crearLocation(lugar: Location) {
        return new Location(
            lugar.id,
            lugar.name,
            lugar.type,
            lugar.dimension,
            lugar.residents,
            lugar.url,
            lugar.created,
            await this.getResidentsCharater(lugar.residents),
        );

    }

    public static async getResidentsCharater(residents: Array<string>) {
        const personajes = await Promise.all(residents.map(r => {
            const num = r.split('/');
            return Character.getCharacter(parseInt(num[num.length - 1]));
        }));

        return personajes;

    }

    public static async getLocation(idLocation: number) {
        const respuesta = await instancia.get(`/${idLocation}`);
        return this.crearLocation(respuesta.data);
    }

}

export default Location;