import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesComponent } from 'src/pages/recipes/recipes.component';
import { RecipeStartComponent } from 'src/pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from 'src/pages/recipes/recipe-detail/recipe-detail.component';
import { AuthGuard } from 'src/auth/auth.guard';
import { RecipesResolveService } from 'src/services/recipes-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: RecipesResolveService,
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: RecipesResolveService,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
