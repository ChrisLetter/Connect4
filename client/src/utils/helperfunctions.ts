const helperFunc: { [key: string]: any } = {};

helperFunc.updateRow = (oldArr: string[], player: string): string[] => {
  const newArr: string[] = [];
  let encounteredFirstZero = false;
  for (let el of oldArr) {
    if (el === '0' && !encounteredFirstZero) {
      newArr.push(player);
      encounteredFirstZero = true;
    } else {
      newArr.push(el);
    }
  }
  return newArr;
};

export default helperFunc;
