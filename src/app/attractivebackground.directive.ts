import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAttractivebackground]',
})
export class AttractivebackgroundDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#FFF7F2');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
