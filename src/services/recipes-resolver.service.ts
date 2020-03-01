import { Injectable } from '@angular/core';
import {
    Resolve,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolveService implements Resolve<Recipe[]> {
    constructor(private dataStorageSrvc: DataStorageService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> {
        /*
            Return set of recipes,
            need to load it first.

            or 

            observable 
            that will in the end yield an array of recipes

            No subscribe, bacause
            this Angular feature will subscribe for me to basically 
            find out once the data is there
        */

        return this.dataStorageSrvc.fetchRecipes();
    }
}
