import { Component } from '@angular/core';
import { LayoutService } from "./shared-module/services/layout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
	isSidebarVisible : boolean = false;
	constructor(private layoutservice : LayoutService) {}

	ngOnInit() {
		this.layoutservice.sidebarSoruce$.subscribe((isVisible) => {
			this.isSidebarVisible = isVisible;
		});
	}
}
