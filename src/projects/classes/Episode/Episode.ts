import Character from "../Character/Character";
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
    objectsCharacter?: Array<Character>;

    constructor(
        _id: number = 0,
        _name: string = '',
        _air_date: string = '',
        _episode: string = '',
        _characters: Array<string> = [],
        _url: string = '',
        _created: string = '',
        _objectsCharacter?: Array<Character>,
    ) {
        this.id = _id;
        this.name = _name;
        this.air_date = _air_date;
        this.episode = _episode;
        this.characters = _characters;
        this.url = _url;
        this.created = _created;
        if (_objectsCharacter) {
            this.objectsCharacter = _objectsCharacter;
        }
    }

    public static async crearEpisodio(episodio: Episode, obtenerPersonajes: boolean) {

        if (!obtenerPersonajes) {
            return new Episode(
                episodio.id,
                episodio.name,
                episodio.air_date,
                episodio.episode,
                episodio.characters,
                episodio.url,
                episodio.created,
            )
        }

        return new Episode(
            episodio.id,
            episodio.name,
            episodio.air_date,
            episodio.episode,
            episodio.characters,
            episodio.url,
            episodio.created,
            await this.getCharactersEpisode(episodio.characters),
        )


    }

    public static async getCharactersEpisode(characters: Array<string>) {
        const personajes = await Promise.all(characters.map(r => {
            const num = r.split('/');
            return Character.getCharacter(parseInt(num[num.length - 1]));
        }));

        return personajes;

    }

    public static async getEpisode(idEpisode: number, obtenerPersonajes: boolean = false) {
        const respuesta = await instancia.get(`/${idEpisode}`);
        return this.crearEpisodio(respuesta.data, obtenerPersonajes);
    }


}

export default Episode;