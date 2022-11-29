import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/productservice";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductFormModel } from "../../shared/models/productform.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productForm: FormGroup<ProductFormModel>;
  productDialog: boolean;
  products: Product[];
  product: Product;
  selectedProducts: Product[] = [];
  submitted: boolean;
  cols: any[];

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }

  get form() {
    return this.productForm?.controls;
  }

  ngOnInit(): void {
    this.createProductForm();
    this.productService.getProducts().then(data => this.products = data);

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' }
    ];
  }

  openNew(): void {
    this.createProductForm();
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = [];
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
    });
  }

  editProduct(product: Product): void {
    this.createProductForm(product);
    this.product = {...product};
    this.productDialog = true;
  }

  deleteProduct(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.product = {};
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    this.product = {
      name: this.productForm.controls.name.value || '',
      description: this.productForm.controls.description.value || '',
      category: this.productForm.controls.category.value || '',
      price: this.productForm.controls.price.value || 0,
      quantity: this.productForm.controls.quantity.value || 0
    }

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
        this.product.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createProductForm(product?: Product): void {
    this.productForm = this.fb.group({
      name: new FormControl<string | null>(product?.name || '', [Validators.required]),
      description: new FormControl<string | null>(product?.description || ''),
      category: new FormControl<string | null>(product?.category || '', [Validators.required]),
      price: new FormControl<number | null>(product?.price || 0, [Validators.required, Validators.min(0.01)]),
      quantity: new FormControl<number | null>(product?.quantity || 0)
    });
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  alertCountUpdate(): void {
    this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Count Child Updated', life: 3000});
  }
}
