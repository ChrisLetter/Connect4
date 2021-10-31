import { PlayersInfoAction } from './actions';
import { PlayersInfo } from './../interfaces/interfaces';

const initialState: PlayersInfo = {
  playerOneName: '',
  playerOneColour: '',
  playerTwoName: '',
  playerTwoColour: '',
};

const reducer = (state = initialState, action: PlayersInfoAction) => {
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
