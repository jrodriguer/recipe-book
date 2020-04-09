import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        SharedModule,
        RouterModule,
        FormsModule,
        ShoppingListRoutingModule,
    ],
})
export class ShoppingListModule {}