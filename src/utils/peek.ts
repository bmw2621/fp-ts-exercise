export const peek =
  (label = "") =>
  <T = unknown,>(a: T): T => {
    console.log(`${label}: ${String(a)}`);
    return a;
  };
