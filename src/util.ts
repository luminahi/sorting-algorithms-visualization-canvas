export async function delay(time: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve("done");
    }, time);
  });
}
