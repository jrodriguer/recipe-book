import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Ingredient } from '../../../../models/ingredient.model';
import { AppState } from '../../../../models/store.model';
import { ShoppingListService } from '../../../services/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') slForm: NgForm;
    sub: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.sub = this.store.select('shoppingList').subscribe(stateData => {
            // Activate each time we send the editing information
            if (stateData.editedIngredientIndex > -1) {
                this.editMode = true;
                this.editedItem = stateData.editedIngredient;
                this.slForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount,
                });
            }
        });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient({
                    index: this.editedItemIndex,
                    ingredient: newIngredient,
                }),
            );
        } else {
            this.store.dispatch(
                new ShoppingListActions.AddIngredient(newIngredient),
            );
        }

        this.editMode = false;

        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEditIngrediet());
    }

    onDelete() {
        this.store.dispatch(
            new ShoppingListActions.RemoveIngredient(this.editedItemIndex),
        );
        this.onClear();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEditIngrediet());
    }
}
