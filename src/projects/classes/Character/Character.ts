import RickAndMortyClient from "../RickAndMortyClient";
import OriginDTO from "./DTOs/OriginDTO";
import LocationDTO from "./DTOs/LocationDTO";
import Episode from "../Episode/Episode";

const instancia = new RickAndMortyClient('/character').getAxiosInstance();
class Character {

    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: OriginDTO;
    location: LocationDTO;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
    seen?: Array<Episode>;

    constructor(
        _id: number = 0,
        _name: string = "",
        _status: string = "",
        _species: string = "",
        _type: string = "",
        _gender: string = "",
        _origin: OriginDTO = { name: "", url: "" },
        _location: LocationDTO = { name: "", url: "" },
        _image: string = "",
        _episode: Array<string> = [],
        _url: string = "",
        _created: string = "",
        _seen?: Array<Episode>,
    ) {
        this.id = _id;
        this.name = _name;
        this.status = _status;
        this.species = _species;
        this.type = _type;
        this.gender = _gender;
        this.origin = _origin;
        this.location = _location;
        this.image = _image;
        this.episode = _episode;
        this.url = _url;
        this.created = _created;

        if (_seen) {
            this.seen = _seen;
        }



    }

    static async crearCharacter(character: Character) {
        return new Character(
            character.id,
            character.name,
            character.status,
            character.species,
            character.type,
            character.gender,
            character.origin,
            character.location,
            character.image,
            character.episode,
            character.url,
            character.created,
            await this.getEpisodes(character.episode),
        )
    }

    public static async getEpisode(idEpisode: number) {
        const seenEpisode: Episode = await Episode.getFirstLocation(idEpisode);
        return seenEpisode;
    }

    public static async getEpisodes(idEpisodes: Array<string>) {
        let newArray: Array<number> = [];

        newArray = idEpisodes.map(e => {
            const partes = e.split('/');
            return Number(partes[partes.length - 1]);
        })

        const getEpisodios = await Promise.all(newArray.map(num => {
            return Episode.getFirstLocation(num)
        }));

        return getEpisodios;
    }

    public static async getCharacter(idCharacter: number) {
        const respuesta = await instancia.get(`/${idCharacter}`);
        const character: Character = await this.crearCharacter(respuesta.data);
        return character;
    }


}

export default Character;