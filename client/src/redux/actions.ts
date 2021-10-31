import { IPlayersInfo } from './../interfaces/interfaces';

export type playersInfoAction = {
  type: 'PLAYERSINFO';
  payload: IPlayersInfo;
};

export function saveUsersInfo(
  usersSelections: IPlayersInfo,
): playersInfoAction {
  return { type: 'PLAYERSINFO', payload: usersSelections };
}
