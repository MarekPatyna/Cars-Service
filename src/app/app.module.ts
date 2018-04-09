import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core-module/core-module.module";
import { RouterModule } from"@angular/router";
import { LoginModule } from"./login/login.module";
import { LoginRoutingModule } from "./login/login-routing.module";
import { AppRoutingModule } from "./app-routing.module";
import { CarsModule, CarsListComponent, CarsRoutingModule, CarsService } from "./cars/index";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { LayoutService } from "./shared-module/services/layout.service";
import { SharedModule } from "./shared-module/shared-module.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CarsModule,
    CoreModule,
    LoginModule,
    AppRoutingModule,
    CarsRoutingModule,
    AppRoutingModule,
    LoginRoutingModule,
    SharedModule
  ],
  providers: [CarsService, AuthService, AuthGuard, LayoutService],
  bootstrap: [AppComponent]
})




export class AppModule { }
