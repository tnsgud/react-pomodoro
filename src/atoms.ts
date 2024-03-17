import { atom, type AtomEffect, selector } from 'recoil';

const saveLocalStorage: AtomEffect<number> = ({ node, onSet, setSelf }) => {
  const { key } = node;

  onSet((newValue, defaultValue, isReset) => {
    if (isReset) return localStorage.setItem(key, JSON.stringify(defaultValue));

    localStorage.setItem(key, JSON.stringify(newValue));
  });
};

const timeAtom = atom({
  key: 'time',
  default: 10,
  effects: [saveLocalStorage],
});

export const timeSelector = selector<number>({
  key: 'timeSelector',
  get: ({ get }) => get(timeAtom),
  set: ({ set }, newValue) => {
    if (newValue === 0) {
      set(roundAtom, (prevRound) => prevRound + 1);
      set(timeAtom, 10);
      return;
    }

    set(timeAtom, newValue);
  },
});

export const roundAtom = atom({
  key: 'round',
  default: 0,
  effects: [saveLocalStorage],
});
