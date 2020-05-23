import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from 'src/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    public ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private slService: ShoppingListService) {}

    ngOnInit() {
        this.ingredients = this.slService.getIngredients();
        this.subscription = this.slService.ingredientsChanged.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients;
                console.log(this.ingredients);
            },
        );
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
