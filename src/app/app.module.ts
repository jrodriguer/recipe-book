import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { DropdownDirective } from '../shared/dropdown.directive';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { AuthComponent } from '../auth/auth.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from 'src/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/shared/placeholder/placeholder.directive';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';
import { ShoppingListComponent } from 'src/pages/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/pages/shopping-list/shopping-edit/shopping-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from 'src/pages/recipes/recipes .module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropdownDirective,
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
        RecipesModule,
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
    entryComponents: [AlertComponent],
})
export class AppModule {}
