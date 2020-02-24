import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Subscription } from "rxjs";
import { map, tap, take, exhaustMap } from "rxjs/operators";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeSrv: RecipeService,
        private authSrv: AuthService
    ) {}

    storageRecipes(): Subscription {
        const recipes = this.recipeSrv.getRecipes();
        return this.http
            .put(
                "https://ng-project-recipesfood.firebaseio.com/recipes.json",
                recipes
            )
            .subscribe(resp => {
                console.log(resp);
            });
    }

    fetchRecipes() {
        // Do not configure a continuous subscription
        // Manage the subscription, give me the last user and cancel

        return this.authSrv.user.pipe(
            take(1),

            // TODO Channel the two observable --the user and the observable http

            exhaustMap(user => {
                // start observable user
                // replaced with the internal observable
                return this.http.get<Recipe[]>(
                    "https://ng-project-recipesfood.firebaseio.com/recipes.json",
                    {
                        params: new HttpParams().set("auth", user.token)
                    }
                );
            }),
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients
                            ? recipe.ingredients
                            : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeSrv.setRecipes(recipes);
            })
        );
    }
}
