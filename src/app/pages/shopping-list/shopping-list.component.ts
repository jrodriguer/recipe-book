import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Ingredient } from '../../../models/ingredient.model';
import * as ShoppingListActions from '../../pages/shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Observable<{ ingredients: Ingredient[] }>; // equal type data of store

  constructor(private store: Store<fromApp.AppState>) {
    // Get ingredients and react (observer) to changes
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnInit() {
    // this.store.select('shoppingList').subscribe();
  }

  onEditItem(index: number) {
    // Issue new value
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
  }
}
