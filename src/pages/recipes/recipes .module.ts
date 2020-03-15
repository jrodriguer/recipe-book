import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from 'src/pages/recipes/recipes.component';
import { RecipeListComponent } from 'src/pages/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from 'src/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/pages/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from 'src/pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/pages/recipes/recipe-edit/recipe-edit.component';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    exports: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
})
export class RecipesModule {}
