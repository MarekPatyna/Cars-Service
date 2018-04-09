import { Injectable } from '@angular/core';
import { Car } from "./models/car";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class CarsService {
   private apiUrl = "http://localhost:3000/api/cars";
   constructor(private httpClient : HttpClient) { }

   getCars() : Observable<Car[]>{
   	return this.httpClient.get<Car[]>(this.apiUrl)
   }

   getCar(id: number) : Observable<Car>{
   	return this.httpClient.get<Car>(this.apiUrl + `/${id}`)
   }

   addCar(data) : Observable<Car>{
   	return this.httpClient.post<Car>(this.apiUrl, data)
   }

   updateCar(id: number, data) : Observable<Car>{
      return this.httpClient.put<Car>(this.apiUrl + `/${id}`, data)
   }

   removeCar(id: number) : Observable<Car> {
   	return this.httpClient.delete<Car>(this.apiUrl + `/${id}`)
   }
}