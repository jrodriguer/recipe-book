import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";

import { RecipeService } from "../recipe.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  /**
   * Initialice Reactive Form of New recipe .
   *
   * @private
   * @memberof RecipeEditComponent
   */
  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescrip = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescrip = recipe.description;
    }

    this.recipeForm = new FormGroup( {
      // FormGroup => outer layer

      // Controls registres 
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDescrip)
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
