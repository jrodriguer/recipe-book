import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../pages/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState, Action> = {
  shoppingList: fromShoppingList.shoppingListReducer as ActionReducer<
    fromShoppingList.State,
    Action
  >,
  auth: fromAuth.authReducer
};
