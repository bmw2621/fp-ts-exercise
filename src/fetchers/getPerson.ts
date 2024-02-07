import { flow } from "fp-ts/lib/function";
import { TaskEither, flatMap } from "fp-ts/TaskEither";
import { array, string, type, TypeOf } from "io-ts";
import decode from "../utils/decode ";
import makeRequest, { RequestConfig } from "../utils/makeRequest";

export type SwapiPerson = TypeOf<typeof SwapiPersonCodec>;

export const SwapiPersonCodec = type({
  name: string,
  height: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: array(string),
  species: array(string),
  vehicles: array(string),
  starships: array(string),
  created: string,
  edited: string,
  url: string,
});

const composeRequest = (id: number): RequestConfig => ({
  url: `https://swapi.dev/api/people/${id}`,
});

const getPerson: (id: number) => TaskEither<Error, SwapiPerson> = flow(
  composeRequest,
  makeRequest<SwapiPerson>,
  flatMap(decode(SwapiPersonCodec)),
);

export default getPerson;
