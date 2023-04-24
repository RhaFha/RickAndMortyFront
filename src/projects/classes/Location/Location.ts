import Character from "../Character/Character";
import RickAndMortyClient from "../RickAndMortyClient";

const instancia = new RickAndMortyClient('/location')
export class Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Array<Character>;
    url: string;
    created: string;

    constructor(
        _id: number = 0,
        _name: string = '',
        _type: string = '',
        _dimension: string = '',
        _residents: Array<Character> = [],
        _url: string,
        _created: string,
    ) {
        this.id = _id;
        this.name = _name;
        this.type = _type;
        this.residents = _residents;
        this.url = _url;
        this.created = _created;
    }

}

export default Location;