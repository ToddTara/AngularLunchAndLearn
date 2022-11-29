import { FormControl } from "@angular/forms";

export interface ProductFormModel {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  category: FormControl<string | null>;
  price: FormControl<number | null>;
  quantity: FormControl<number | null>;
  email: FormControl<string| null>;
}
