import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
import { AuthComponent } from '../auth/auth.component';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from 'src/pages/recipes/recipes.module';
import { ShoppingListModule } from 'src/pages/shopping-list/shoping-list.module';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from './core.module';

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
        CoreModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
