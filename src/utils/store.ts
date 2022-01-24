const create = () => {
  let currentRow = 0;
  let currentKeys: string[] = [];

  const subscribers: Set<() => void> = new Set();
  return {
    get currentRow() {
      return currentRow;
    },
    get currentKeys() {
      return currentKeys;
    },
    incrementRow() {
      currentRow += 1;
      subscribers.forEach((fn) => fn());
    },
    subscribe(fn: () => void) {
      subscribers.add(fn);
      return () => subscribers.delete(fn);
    },
    addKey(key: string) {
      currentKeys.push(key);
      subscribers.forEach((fn) => fn());
    },
    removeKey() {
      currentKeys = currentKeys.slice(0, -1);
      subscribers.forEach((fn) => fn());
    },
  };
};

export const store = create();
