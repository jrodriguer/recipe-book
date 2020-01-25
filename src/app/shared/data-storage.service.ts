import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeSrv: RecipeService) {}

    storageRecipes() {
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
}
