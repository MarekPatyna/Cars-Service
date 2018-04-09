import { Component, OnInit, OnDestroy } from '@angular/core';
import { CostSharedService } from "../../cost-shared.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'cs-income-tax',
  templateUrl: './income-tax.component.html'
})
export class IncomeTaxComponent implements OnInit, OnDestroy {

  private inComeTax : number = 18;
  income : number;
  costSubscription : Subscription;

  constructor(private costSharedService : CostSharedService) { }

  ngOnInit() {
  	this.costSubscription = this.costSharedService.totalCostSoruce$.subscribe((cost) =>{
  		this.income = cost * this.inComeTax / 100;
  	});
  }

  ngOnDestroy() {
  	if (this.costSubscription) {
  		this.costSubscription.unsubscribe();
  	}
  }
}
