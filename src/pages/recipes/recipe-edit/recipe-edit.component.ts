import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
    FormGroup,
    FormControl,
    FormArray,
    Validators,
    AbstractControl,
} from '@angular/forms';

import { RecipeService } from 'src/services/recipe.service';
@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
    public id: number;
    public editMode = false;
    public recipeForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router,
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
                amount: new FormControl(),
            }),
        );
    }

    /**
     * Get access to the recipe form
     * and thereby get access to my ingredients.
     *
     * @param {number} index
     * @memberof RecipeEditComponent
     */
    onDeleteIngr(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    /**
     * Initialice Reactive Form of New recipe.
     *
     * @private
     * @memberof RecipeEditComponent
     */
    private initForm() {
        let recipeName = '';
        let recipeImgPath = '';
        let recipeDescrip = '';
        let recipeIngrs = new FormArray([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImgPath = recipe.imagePath;
            recipeDescrip = recipe.description;
            if (recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    recipeIngrs.push(
                        new FormGroup({
                            name: new FormControl(
                                ingredient.name,
                                Validators.required,
                            ),
                            amount: new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/),
                            ]),
                        }),
                    );
                }
            }
        }

        this.recipeForm = new FormGroup({
            // FormGroup => outer layer

            // Controls registres
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImgPath, Validators.required),
            description: new FormControl(recipeDescrip, Validators.required),
            ingredients: recipeIngrs,
        });
    }

    getControls(): AbstractControl[] {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
}
