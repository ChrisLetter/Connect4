const helperFunc: { [key: string]: any } = {};

helperFunc.updateColumn = (oldArr: string[], player: string): string[] => {
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

helperFunc.checkIfColumnHasSpace = (arr: string[]): boolean => {
  return arr[5] === '0' ? true : false;
};

export default helperFunc;
