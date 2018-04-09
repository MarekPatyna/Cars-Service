
import { CarsService } from "./cars.service"
import { Car } from "./models/car";
import { ActivatedRouteSnapshot, Resolve} from "@angular/router";
import { Injectable } from '@angular/core';


@Injectable()
export class CarResolve implements Resolve<Car>{
	constructor(private carsService : CarsService) {}

	resolve(route : ActivatedRouteSnapshot) {
		return this.carsService.getCar(route.params['id']);
	}
}


