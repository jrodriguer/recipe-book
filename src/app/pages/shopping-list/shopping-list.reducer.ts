import { Ingredient } from '../../../models/ingredient.model';

const initialState = {
    ingredient: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(state = initialState, action) {}
