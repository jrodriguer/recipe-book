import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Ingredient } from '../../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
    // Equal type data of store
    public ingredients: Observable<{ ingredients: Ingredient[] }>;

    constructor(
        private slService: ShoppingListService,
        private store: Store<{ shoppigList: { ingredients: Ingredient[] } }>,
    ) {}

    ngOnInit() {
        this.ingredients = this.store.select('shoppigList');
    }

    /**
     * Issue new value.
     *
     * @param {number} index
     * @memberof ShoppingListComponent
     */
    onEditItem(index: number) {
        this.slService.startEditing.next(index);
    }
}
