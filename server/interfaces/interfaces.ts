export interface IRoom {
  id: string;
  name: string;
  player1: string;
  player2: string;
  game: {
    currentTurn: string;
    winner: string;
    moves: number;
    column1: string[];
    column2: string[];
    column3: string[];
    column4: string[];
    column5: string[];
    column6: string[];
    column7: string[];
  };
}
