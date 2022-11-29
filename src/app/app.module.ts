import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeModule } from "./home/home.module";
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {PrimeNgModule} from "./primeng/primeng.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ BrowserModule, AppRoutingModule, BrowserAnimationsModule, HomeModule, MenubarModule, InputTextModule, PrimeNgModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
