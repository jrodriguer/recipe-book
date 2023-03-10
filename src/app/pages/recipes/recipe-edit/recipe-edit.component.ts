import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl
} from '@angular/forms';

import { RecipeService } from '../../../services/recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  public id = 0;
  public editMode = false;
  public recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else this.recipeService.addRecipe(this.recipeForm.value);

    this.onCancel();
  }

  onAddIngr() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl()
      })
    );
  }

  onDeleteIngr(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescrip = '';
    const recipeIngrs = [];

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescrip = recipe.description;
      if (this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImgPath = recipe.imagePath;
        recipeDescrip = recipe.description;
        if (recipe['ingredients']) {
          for (const ingredient of recipe.ingredients) {
            recipeIngrs.push(
              new FormGroup<{
                name: FormControl<string | null>;
                amount: FormControl<number | null>;
              }>({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      }
    }

    recipeIngrs.push(new FormArray([]));

    this.recipeForm = new FormGroup({
      // FormGroup => outer layer

      // Controls registres
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImgPath),
      description: new FormControl(recipeDescrip, Validators.required),
      ingredients: new FormArray(recipeIngrs) // fix FormArray<never>[]
    });
  }

  getControls(): AbstractControl[] {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
