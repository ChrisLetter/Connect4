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

// I created this function so I can have the rows, columns and diagonals possible
helperFunc.checkForWinner = (
  column1: string[],
  column2: string[],
  column3: string[],
  column4: string[],
  column5: string[],
  column6: string[],
  column7: string[],
): string => {
  const row1 = [
    column1[0],
    column2[0],
    column3[0],
    column4[0],
    column5[0],
    column6[0],
    column7[0],
  ];
  const row2 = [
    column1[1],
    column2[1],
    column3[1],
    column4[1],
    column5[1],
    column6[1],
    column7[1],
  ];
  const row3 = [
    column1[2],
    column2[2],
    column3[2],
    column4[2],
    column5[2],
    column6[2],
    column7[2],
  ];
  const row4 = [
    column1[3],
    column2[3],
    column3[3],
    column4[3],
    column5[3],
    column6[3],
    column7[3],
  ];
  const row5 = [
    column1[4],
    column2[4],
    column3[4],
    column4[4],
    column5[4],
    column6[4],
    column7[4],
  ];
  const row6 = [
    column1[5],
    column2[5],
    column3[5],
    column4[5],
    column5[5],
    column6[5],
    column7[5],
  ];
  const rightDiagonal1 = [column1[2], column2[3], column3[4], column4[5]];
  const rightDiagonal2 = [
    column1[1],
    column2[2],
    column3[3],
    column4[4],
    column5[5],
  ];
  const rightDiagonal3 = [
    column1[0],
    column2[1],
    column3[2],
    column4[3],
    column5[4],
    column6[5],
  ];
  const rightDiagonal4 = [
    column2[0],
    column3[1],
    column4[2],
    column5[3],
    column6[4],
    column6[5],
  ];
  const rightDiagonal5 = [
    column3[0],
    column4[1],
    column5[2],
    column6[3],
    column7[4],
  ];
  const rightDiagonal6 = [column4[0], column5[1], column6[2], column7[3]];
  const leftDiagonal1 = [column1[3], column2[2], column3[1], column4[0]];
  const leftDiagonal2 = [
    column1[4],
    column2[3],
    column3[2],
    column4[1],
    column5[0],
  ];
  const leftDiagonal3 = [
    column1[5],
    column2[4],
    column3[3],
    column4[2],
    column5[1],
    column6[0],
  ];
  const leftDiagonal4 = [
    column2[5],
    column3[4],
    column4[3],
    column5[2],
    column6[1],
    column7[0],
  ];
  const leftDiagonal5 = [
    column3[5],
    column4[4],
    column5[3],
    column6[2],
    column7[1],
  ];
  const leftDiagonal6 = [column4[5], column5[4], column6[3], column7[2]];
  const allLines = [
    column1,
    column2,
    column3,
    column4,
    column5,
    column6,
    column7,
    row1,
    row2,
    row3,
    row4,
    row5,
    row6,
    rightDiagonal1,
    rightDiagonal2,
    rightDiagonal3,
    rightDiagonal4,
    rightDiagonal5,
    rightDiagonal6,
    leftDiagonal1,
    leftDiagonal2,
    leftDiagonal3,
    leftDiagonal4,
    leftDiagonal5,
    leftDiagonal6,
  ];
  const resultCheckEveryLine = [];
  for (let el of allLines) {
    resultCheckEveryLine.push(checkIfLineHas4(el));
  }
  if (resultCheckEveryLine.includes('1')) {
    return '1';
  } else if (resultCheckEveryLine.includes('2')) {
    return '2';
  } else {
    return '0';
  }
};

function checkIfLineHas4(arr: string[]) {
  let currentNumber = '0';
  let counter = 0;
  let winner = '0';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '0') {
      if (currentNumber === arr[i]) {
        counter++;
        counter === 4 ? (winner = arr[i]) : (winner = '0');
      } else {
        currentNumber = arr[i];
        counter = 1;
      }
    } else {
      currentNumber = '0';
      counter = 0;
    }
  }
  return winner;
}

export default helperFunc;
