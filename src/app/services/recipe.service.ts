import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Subject, Observable } from "rxjs";

import { Recipe } from "../../models/recipe.model";
import { Ingredient } from "../../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import * as ShoppingListActions from '../pages/shopping-list/store/shopping-list.actions';


@Injectable({
    providedIn: "root"
})
export class RecipeService {
    public recipesChanged = new Subject<Recipe[]>(); // variety of recipes as a value
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService,
        private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
        ) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
