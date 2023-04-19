export type Producer<T> = () => T;
export const lazy = <T>(factory: Producer<T>): Producer<T> => {
  let loaded = false;
  let value: T | undefined = undefined;
  return () => {
    if (!loaded) {
      value = factory();
      loaded = true;
    }
    return value as T;
  };
};
