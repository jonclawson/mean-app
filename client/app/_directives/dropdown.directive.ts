import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[dropdownDirective]' })
export class dropdownDirective {
    constructor(el: ElementRef) {
       el.nativeElement.onclick = function(e){
            if(el.nativeElement.className.indexOf('open')> -1){
               el.nativeElement.className = el.nativeElement.className.replace('open', '');
            }
            else{
                el.nativeElement.className+= ' open';
            }
       }
    }
}