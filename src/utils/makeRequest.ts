import { TaskEither, tryCatch, chain } from "fp-ts/TaskEither";
import { toError } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

export interface RequestConfig extends Partial<RequestInit> {
  url: string;
}

const makeRequest = <T,>({
  url,
  ...rest
}: RequestConfig): TaskEither<Error, T> =>
  pipe(
    tryCatch(() => fetch(url, { ...rest }), toError),
    chain((resp) => tryCatch(() => resp.json(), toError)),
  );

export default makeRequest;
