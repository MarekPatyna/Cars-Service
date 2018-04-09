import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class CostSharedService {
	totalCostSoruce$ = new Subject<number>();

	sharedCost(cost : number) {
		this.totalCostSoruce$.next(cost);
	}
}
