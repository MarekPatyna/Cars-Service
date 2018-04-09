import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LayoutService {
	sidebarSoruce$ = new Subject<boolean>();

	showSidebar(): void {
		this.sidebarSoruce$.next(true);
	}

	hideSidebar(): void {
		this.sidebarSoruce$.next(false);
    }
}
