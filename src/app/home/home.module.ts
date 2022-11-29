import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home.component";
import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../primeng/primeng.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeFormComponent } from './components/home-form/home-form.component';
import { ConfirmationService, MessageService } from "primeng/api";
import { ProductService } from "../shared/services/productservice";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [HomeComponent, HomeFormComponent],
  providers: [MessageService, ConfirmationService, ProductService, HttpClient],
  imports: [ CommonModule, PrimeNgModule, ReactiveFormsModule, HomeRoutingModule, HttpClientModule, RippleModule ]
})
export class HomeModule {
}
