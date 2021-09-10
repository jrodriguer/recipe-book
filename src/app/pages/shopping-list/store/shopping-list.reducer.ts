import { Ingredient } from '../../../../models/ingredient.model';
import { State } from '../../../../models/store.model';
import * as ShoppingListActions from './shopping-list.actions';


const initialState: State = {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActions,
) {
    switch (action.type) {
        /**
         * 1. Copy existing state
         * 2. Overwrite ingredients, updating state
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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = { ...ingredient,  ...action.payload };
            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updateIngredient;

            return {
                ...state,
                ingredients: updateIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListActions.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                }),
                editedIngredientIndex: null,
                editedIngredient: -1
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: null,
                editedIngredient: -1
            }
        default:
            return state;
    }
}
