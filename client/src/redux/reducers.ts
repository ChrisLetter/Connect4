import { playersInfoAction } from './actions';
import { IPlayersInfo } from '../interfaces/interfaces';

const initialState: IPlayersInfo = {
  playerOneName: '',
  playerOneColour: '',
  playerTwoName: '',
  playerTwoColour: '',
};

const reducer = (state = initialState, action: playersInfoAction) => {
  switch (action.type) {
    case 'PLAYERSINFO':
      return {
        ...state,
        playerOneName: action.payload.playerOneName,
        playerOneColour: action.payload.playerOneColour,
        playerTwoName: action.payload.playerTwoName,
        playerTwoColour: action.payload.playerTwoColour,
      };
    default:
      return state;
  }
};

export default reducer;
