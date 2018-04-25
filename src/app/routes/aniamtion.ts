import { AnimationEntryMetadata, state } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '\@angular/animations';

export const routeAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    transition(':enter', [
      style({
        position: 'absolute',
        width:"100%"
      }),
      animate('0.5s ease-in-out')
    ]),
    transition('* => *', [
      query(':leave', style({opacity : 0 , position: 'absolute'}), { optional: true }),
      query(':enter', style({opacity : 0 , position: 'absolute'}), { optional: true }),

      group([
        query(':leave', animate('10s ease-in-out', style({opacity : 0 })), { optional: true }),
        query(':enter', animate('10s ease-in-out', style({opacity : 1 })), { optional: true })
      ])
    ])
  ]);
