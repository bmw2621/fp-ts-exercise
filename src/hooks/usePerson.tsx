import { map } from "fp-ts/Task";
import { fold } from "fp-ts/Either";
import { pipe } from "fp-ts/lib/function";
import { IO } from "fp-ts/IO";
import { useCallback, useEffect, useState } from "react";
import getPerson, { SwapiPerson } from "../fetchers/getPerson";
import { peek } from "../utils/peek";

const usePerson = (personId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [person, setPerson] = useState<SwapiPerson>();

  useEffect(
    () => console.log({ isLoading, error, person }),
    [error, isLoading, person],
  );

  const toggleLoading: IO<void> = () => {
    setIsLoading((prev) => !prev);
  };

  const fetchPersonById = useCallback(
    (id: number) =>
      pipe(
        id,
        getPerson,
        map(
          fold(
            (e) => setError(e.message),
            (person) => setPerson(person),
          ),
        ),
      ),
    [],
  );

  useEffect(() => {
    toggleLoading();
    fetchPersonById(personId);
  }, [fetchPersonById, personId]);

  return {
    isLoading,
    error,
    person,
  };
};

export default usePerson;
