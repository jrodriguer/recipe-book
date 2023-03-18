import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { doc } from 'firebase/firestore';

import { RecipeService } from './recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeSrv: RecipeService) {}

  storageRecipes(): Observable<Object> {
    const recipes = this.recipeSrv.getRecipes();
    return this.http.put(
      'https://recipe-book-13023-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      recipes
    );
  }

  fetchRecipes(): Observable<
    {
      ingredients: Ingredient[];
      name: string;
      description: string;
      imagePath: string;
    }[]
  > {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-13023-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes) => {
          this.recipeSrv.setRecipes(recipes);
        })
      );
  }
}
