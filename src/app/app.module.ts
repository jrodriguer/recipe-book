import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { ShoppingListService } from '../services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from 'src/pages/recipes/recipes.module';
import { ShoppingListModule } from 'src/pages/shopping-list/shoping-list.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent, AuthComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        RecipesModule,
        ShoppingListModule,
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
