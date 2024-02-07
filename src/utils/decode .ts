import { TaskEither, fromEither, mapLeft } from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { Decoder, Errors } from "io-ts";

const decodeError = (e: Errors): Error =>
  new Error(e.map((err) => err.context.map(({ key }) => key)).join(", "));

const decode =
  <A,>(codec: Decoder<unknown, A>) =>
  (res: unknown): TaskEither<Error, A> =>
    pipe(res, codec.decode, fromEither, mapLeft(decodeError));

export default decode;
