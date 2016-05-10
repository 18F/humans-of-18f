export function filledArray<T>(length: number, value: T): T[] {
  let array = new Array(length);

  for (let i = 0; i < length; i++) {
    array.push(value);
  }

  return array;
}

export function randomIndex(list: any[]): number {
  return Math.floor(Math.random() * list.length);
}

export function withoutIndex<T>(list: T[], i: number): T[] {
  let copy = list.slice();

  copy.splice(i, 1);

  return copy;
}

export function without<T>(list: T[], item: T) {
  let i = list.indexOf(item);

  return i === -1 ? list : withoutIndex(list, i);
}

export function randomChoice<T>(list: T[]): T {
  return list[randomIndex(list)];
}
