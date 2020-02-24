import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeSrv: RecipeService) {}

    storageRecipes(): Subscription {
        const recipes = this.recipeSrv.getRecipes();
        return this.http
            .put(
                'https://ng-project-recipesfood.firebaseio.com/recipes.json',
                recipes,
            )
            .subscribe(resp => {
                console.log(resp);
            });
    }

    fetchRecipes() {
        // Interceptor atack in here
        return this.http
            .get<Recipe[]>(
                'https://ng-project-recipesfood.firebaseio.com/recipes.json',
            )
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients
                                ? recipe.ingredients
                                : [],
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeSrv.setRecipes(recipes);
                }),
            );
    }
}
