import { Ingredient } from "./ingredient.model";

export interface AppState {
  shoppingList: State;
}

export class State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number
}
