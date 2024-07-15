import { Item } from "./Item.js";

export function getOptions(form: HTMLFormElement) {
  const formData = new FormData(form);

  const formSpeed = formData.get("speed") ?? 1;
  const formSorting = formData.get("sorting") ?? "bubble";
  const formMode = formData.get("mode") ?? "random";

  const speed = 100 / Number.parseInt(formSpeed.toString());
  const sorting = formSorting.valueOf();
  const mode = formMode.valueOf();

  return { speed, sorting, mode };
}

export function swap(array: Item[], i: number, j: number) {
  let aux = array[i].getValue();
  array[i].setValue(array[j].getValue());
  array[j].setValue(aux);
}

export async function delay(time: number): Promise<void> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
