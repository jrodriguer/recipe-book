import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecipesComponent } from '../../pages/recipes/recipes.component';
import { RecipeListComponent } from '../../pages/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../../pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from '../../pages/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from '../../pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../../pages/recipes/recipe-edit/recipe-edit.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        RecipesRoutingModule,
    ],
})
export class RecipesModule {}
