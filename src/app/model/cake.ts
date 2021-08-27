
export class Ingredient {
    ingredientName: string = "";
    ingredientQuantity: number = 0;
    unit: string = "";
}

export class Cake {
    _id: string = "";
    name: string = "";
    ingredientList: [Ingredient] = [new Ingredient()];
    baked: Date = new Date();
    quantity: number = 1;
    sold: number = 0;
    price: number = 0;
}
