import { fold } from "fp-ts/TaskEither";
import * as Task from "fp-ts/Task";
import { pipe } from "fp-ts/lib/function";
import { useCallback, useEffect, useState } from "react";
import getPerson, { SwapiPerson } from "../fetchers/getPerson";
import { peek } from "../utils/peek";

const usePerson = (personId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [person, setPerson] = useState<SwapiPerson>();

  const fetchPersonById = useCallback(
    async (id: number) =>
      pipe(
        id,
        getPerson,
        peek("inside hook"),
        fold(
          (e) => Task.of(setError(e.message)),
          (person: SwapiPerson) => Task.of(setPerson(person)),
        ),
      )(),
    [],
  );

  useEffect(() => {
    setIsLoading(true);
    fetchPersonById(personId).finally(() => setIsLoading(false));
  }, [fetchPersonById, personId]);

  return {
    isLoading,
    error,
    person,
  };
};

export default usePerson;
