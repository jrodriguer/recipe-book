import { Action } from '@ngrx/store';

import { Ingredient } from '../../../../models/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const UPDATE_INGREDIENTS = 'UPDATE_INGREDIENTS';
export const REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

// export class AddIngredients implements Action {
//   readonly type = ADD_INGREDIENTS;
//   constructor(public payload: Ingredient[]) {}
// }

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENTS;
  constructor(public payload: Ingredient) {}
}

export class RemoveIngredient implements Action {
  readonly type = REMOVE_INGREDIENTS;
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEditIngredient implements Action {
  // Reset editedIngredient and editedIngredientIndex
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | UpdateIngredient
  | RemoveIngredient
  | StartEditIngredient
  | StopEditIngredient;
