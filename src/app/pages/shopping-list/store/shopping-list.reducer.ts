import { Ingredient } from '../../../../models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActions,
) {
    switch (action.type) {
        /**
         * 1. Copy state
         * 2. Overwrite ingredients
         *
         * Work with a new matrix
         * and that new matrix will basically be the old ingredient matrix
         */

        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            // Get ingredient for edit
            const ingredient = state.ingredients[action.payload.index];
            //
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient,
            };

            const updateIngredients = [...state.ingredients];
            updateIngredients[action.payload.index] = updateIngredient;
            return {
                ...state,
                ingredients: updateIngredients,
            };
        case ShoppingListActions.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== action.payload;
                }),
            };
        default:
            return state;
    }
}
