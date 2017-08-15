import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[dropdownDirective]' })
export class dropdownDirective {
    constructor(el: ElementRef) {
    document.addEventListener('click', function(event) {
      var isClickInside = el.nativeElement.contains(event.target);
      if (!isClickInside) {
        el.nativeElement.className = el.nativeElement.className.replace('open', '');
      }else{
          if(el.nativeElement.className.indexOf('open')> -1){
             el.nativeElement.className = el.nativeElement.className.replace('open', '');
          }
          else{
              el.nativeElement.className+= ' open';
          }
      }
    });
    }
}