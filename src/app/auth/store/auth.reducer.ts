import { User } from '../../../models/user.model';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: any): State {
  return state;
}
