import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from 'src/pages/recipes/recipes.module';
import { ShoppingListModule } from 'src/pages/shopping-list/shoping-list.module';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from 'src/auth/auth.module';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        RecipesModule,
        ShoppingListModule,
        CoreModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
