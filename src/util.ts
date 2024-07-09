export async function delay(time: number): Promise<void> {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
