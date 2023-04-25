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
    seen?: Episode;

    constructor(
        _id: number,
        _name: string,
        _status: string,
        _species: string,
        _type: string,
        _gender: string,
        _origin: OriginDTO,
        _location: LocationDTO,
        _image: string,
        _episode: Array<string>,
        _url: string,
        _created: string,
        _seen?: Episode,
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

    public static async getEpisode(idEpisode: number) {
        const seenEpisode: Episode = await Episode.getFirstLocation(idEpisode);
        return seenEpisode;
    }

    public static async getCharacter(idCharacter: number) {
        const respuesta = await instancia.get(`/${idCharacter}`);
        return respuesta.data;
    }


}

export default Character;