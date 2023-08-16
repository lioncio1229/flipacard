
export default function<T>(arr: T[]) {
    const arrCopy = [...arr];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arrCopy[i];
      arrCopy[i] = arrCopy[j];
      arrCopy[j] = temp;
    }
    return arrCopy;
}