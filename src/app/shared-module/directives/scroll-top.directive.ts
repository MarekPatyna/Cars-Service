import { Directive, Renderer2, ElementRef, Inject, HostBinding, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[csScrollTop]'
})
export class ScrollTopDirective {
  
  private scrollTreshold = 150;

  @HostBinding('class') scrollTopBtn = 'scroll-top-btn';

  @HostListener('click') onClick() {
  	window.scrollTo(0, 0);
  }

  @HostListener('document:scroll') onScroll() {
  	let scrollPosition = window.scrollY || this.document.documentElement.scrollTop || this.document.body.scrollTop;

  	if (scrollPosition > this.scrollTreshold) {
  		this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'block');
  	} else {
  		this.renderer.setStyle(this.hostElement.nativeElement, 'display', 'none');
  	}
  }

  constructor(private renderer : Renderer2, private hostElement : ElementRef, @Inject(DOCUMENT) private document) { }

}
