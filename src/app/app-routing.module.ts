import {NgModule} from "@angular/core";
import { RouterModule, Routes, Route } from"@angular/router";
import {CarsListComponent} from "./cars/cars-list/cars-list.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginModule} from "./login/login.module"

const APP_ROUTES : Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'cars', canActivate: 
[AuthGuard] },

    { path: 'cars', component: <any>CarsListComponent, canActivate: 
[AuthGuard]}

];


@NgModule({
	imports: [
	RouterModule.forRoot(APP_ROUTES, { enableTracing: true})
	],
	exports: []
})


export class AppRoutingModule{}


