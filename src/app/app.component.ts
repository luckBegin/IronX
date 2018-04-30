import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<div style='height:100%;'>
  	<router-outlet></router-outlet>
  </div>`,
  styles : [``],
})
export class AppComponent {
    constructor(){}
};