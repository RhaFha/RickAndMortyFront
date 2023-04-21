import RickAndMortyClient from "../RickAndMortyClient";

const instancia = new RickAndMortyClient('/episode').getAxiosInstance();
export class Episode {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: Array<string>;
    url: string;
    created: string;

    constructor(
        _id: number = 0,
        _name: string = '',
        _air_date: string = '',
        _episode: string = '',
        _characters: Array<string> = [],
        _url: string = '',
        _created: string = '',
    ) {
        this.id = _id;
        this.name = _name;
        this.air_date = _air_date;
        this.episode = _episode;
        this.characters = _characters;
        this.url = _url;
        this.created = _created;
    }

    public static async getFirstLocation() {
        const respuesta = await instancia.get('/1'); console.log(respuesta);

        return new Episode();
    }
}
 
export default Episode;