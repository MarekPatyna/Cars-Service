import { Component, Renderer2, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Car } from "../models/car";
import { CarsService } from "../cars.service";
import {TotalCostComponent} from "../total-cost/total-cost.component";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import { CostSharedService } from "../cost-shared.service";
import { CarTableRowComponent } from "../car-table-row/car-table-row.component";
import { CsValidators} from "../../shared-module/validators/cs-validators";


@Component({
  selector: 'cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less']
})
export class CarsListComponent implements OnInit, AfterViewInit {

  @ViewChild("totalCostRef") totalCostRef : TotalCostComponent;
  @ViewChild("addCarTitle") addCarTitle : ElementRef
  @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;

  totalCost: number;

  grossCost: number;

  cars: Car[];
  carForm : FormGroup;

  constructor(private carsService : CarsService,
              private formBuilder : FormBuilder,
              private renderer : Renderer2,
              private router : Router,
              private costSharedService : CostSharedService,
              ) { }

  buildCarForm() {
    return this.formBuilder.group({

      model: ['', Validators.required],
      type: '',
      plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      deadline: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      color: '',
      power: ['', CsValidators.power],
      clientFirstName: '',
      clientSurname: '',
      isFullyDamaged: '',
      year: '',

      parts: this.formBuilder.array([]) 
    });
  }

  buildParts() : FormGroup {
    return this.formBuilder.group({
        name: '',
        inStock: true,
        price: ''
      });
  }

  get parts() : FormArray {
    return <FormArray>this.carForm.get('parts');
  }

  addPart() : void {
    this.parts.push(this.buildParts())
  }

  removePart(i) : void {
    this.parts.removeAt(i);
  }

  togglePlateValidity() {
    const damageControl = this.carForm.get('isFullyDamaged');
    const plateControl = this.carForm.get('plate');

    if (damageControl.value) {
      plateControl.clearValidators();
    } else {
      plateControl.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(7)]);
    }

    plateControl.updateValueAndValidity();
  }

  countTotalCost() : void{
      this.totalCost = this.cars
      .map((car) => car.cost)
      .reduce((prev,next) =>prev + next);
    }

  ngOnInit() {
  	this.loadCars();
    this.carForm = this.buildCarForm();
  }

  ngAfterViewInit() {

    const addCarTitle = this.addCarTitle.nativeElement;

    this.carForm.valueChanges.subscribe(() => {
      if (this.carForm.invalid) {
        this.renderer.setStyle(addCarTitle, 'color', 'red');
      }  else {
        this.renderer.setStyle(addCarTitle, 'color', 'white');
      }
    });
  }

  onRemovedCar(car : Car) {
    this.carsService.removeCar(car.id).subscribe(() => {
      this.loadCars();
    });
  }

  loadCars() : void {
  	this.carsService.getCars().subscribe((cars) => {
  	this.cars = cars;
    this.countTotalCost();
    this.costSharedService.sharedCost(this.totalCost);
  	})
  }

  goToCarDetails(car : Car) {
    this.router.navigate(['/cars',car.id]);
  }

  onShownGross(grossCost : number): void {
    this.grossCost = grossCost;
  }

  getPartsCost(parts) {
    return parts.reduce((prev, nextPart) => {
      return parseFloat(prev) + parseFloat(nextPart.price);
    }, 0);
  }

  showGross(): void{
      this.totalCostRef.showGross();
    }

  addCar(){
    let carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);
    
    this.carsService.addCar(carFormData).subscribe(() => {
      this.loadCars();
    });
  }
}
