import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { DropdownDirective } from '../shared/dropdown.directive';
import { ShoppingListService } from '../services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from '../services/recipe.service';
import { AuthComponent } from '../auth/auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { RecipesComponent } from 'src/pages/recipes/recipes.component';
import { RecipeListComponent } from 'src/pages/recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from 'src/pages/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from 'src/pages/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from 'src/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/pages/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeStartComponent } from 'src/pages/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from 'src/pages/recipes/recipe-edit/recipe-edit.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/shared/placeholder/placeholder.directive';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropdownDirective,
        RecipeStartComponent,
        RecipeEditComponent,
        AuthComponent,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
