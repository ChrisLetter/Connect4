import { PlayersInfo } from './../interfaces/interfaces';

export type PlayersInfoAction = {
  type: 'PLAYERSINFO';
  payload: PlayersInfo;
};

export function saveUsersInfo(
  usersSelections: PlayersInfo,
): PlayersInfoAction {
  return { type: 'PLAYERSINFO', payload: usersSelections };
}
