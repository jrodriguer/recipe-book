import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm;
  subs: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.subs = this.slService.startEditing.subscribe((index: number) => {
      // Activarse cada vez que enviemos la información de edición
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value; // Get the form value
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode)
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    else this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
