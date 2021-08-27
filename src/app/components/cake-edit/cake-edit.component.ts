import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Cake, Ingredient } from 'src/app/model/cake';
import { CakeService } from 'src/app/services/cake.service';

@Component({
  selector: 'app-cake-edit',
  templateUrl: './cake-edit.component.html',
  styleUrls: ['./cake-edit.component.scss']
})
export class CakeEditComponent implements OnInit {

  cakeForm: FormGroup;

  cake: Cake = new Cake();
  baked: Date = new Date();

  operation: string = "Inserisci";
  private isEdit: boolean = false;
  private cakeId: string = "";

  constructor(
    private formBuilder:FormBuilder,
    private cakeService: CakeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.cakeForm = this.formBuilder.group({
      name: "",
      ingredientList: this.formBuilder.array([]),
      baked: new Date(),
      quantity: 1,
      sold: 0,
      price: 0
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.reset();
      if(paramMap.has("id")) {
        this.cakeId = paramMap.get("id") || "";
      }
      if(this.cakeId) {
        this.getCakeForEdit();
      }
    });
  }

  reset() {
    this.operation = "Inserisci";
    this.isEdit = false;

    this.cakeId = "";
    this.cake = new Cake();
    this.cakeForm = this.formBuilder.group({
      name: "",
      ingredientList: this.formBuilder.array([]),
      baked: new Date(),
      quantity: 1,
      sold: 0,
      price: 0
    })
    this.baked = new Date();
  }

  getCakeForEdit() {
    this.cakeService.getCake(this.cakeId).subscribe(cakeData => {
      this.isEdit = true;
      this.operation = "Modifica";

      this.cake = cakeData;
      let ingredientGroupList = this.populateIngredients(this.cake.ingredientList);
      this.cakeForm = this.formBuilder.group({
        name: this.cake.name,
        ingredientList: this.formBuilder.array(ingredientGroupList),
        baked: new Date(this.cake.baked),
        quantity: this.cake.quantity,
        sold: this.cake.sold,
        price: this.cake.price
      });
      this.baked = new Date(this.cake.baked);
    });
  }

  updateBakedDate(event: any) {
    this.baked = event.target.valueAsDate;
    this.cake.baked = this.baked;
  }

  populateIngredients(ingredientList: Ingredient[]) : FormGroup[] {
    let ingredientGroupList: FormGroup[] = [];
    for(let ingredient of ingredientList) {
      ingredientGroupList.push(this.formBuilder.group({
        ingredientName: ingredient.ingredientName,
        ingredientQuantity: ingredient.ingredientQuantity,
        unit: ingredient.unit
      }));
    }
    return ingredientGroupList;
  }

  ingredientList() : FormArray {
    return this.cakeForm.get("ingredientList") as FormArray;
  }

  private newIngredient(): FormGroup {
    return this.formBuilder.group({
      ingredientName: "",
      ingredientQuantity: 0,
      unit: ""
    });
  }

  addIngredient() {
    this.ingredientList().push(this.newIngredient());
  }

  removeIngredient(index: number) {
    if(index > -1) {
      this.ingredientList().removeAt(index);
    }
  }

  onSubmit() {
    let cakeRes: Cake = this.cakeForm.value;
    cakeRes.baked = this.baked;
    if(this.isEdit) {
      cakeRes._id = this.cakeId;
      this.cakeService.updateCake(this.cakeId, cakeRes)
        .subscribe(res => { this.router.navigate(["/"]); });
    } else {
      this.cakeService.addCake(cakeRes)
        .subscribe(res => { this.router.navigate(["/"]); });
    }
  }

}
