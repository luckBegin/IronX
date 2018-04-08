import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// component
import { SideMenuComponent } from '../layout/side-menu/side-menu.component' ;
import { TagNavComponent } from '../layout/tag-nav/tag-nav.component' ;
import { LayoutComponent } from '../layout/layout.component' ;
import { TableComponent } from './table/table.component' ;

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { MenuService } from '../service/menu/menu.service' ;
import { SessionStorageService } from '../service/storage/session_storage' ;
import { LocalStorageService } from '../service/storage/local_storage' ;
import { EmitService } from '../service/event-emit.service' ;
import { MsgService } from '../service/msg/msg.service';

// workbench
import { WorkbenchAll } from '../service/workbench/all.service';
const layOut = [
    SideMenuComponent ,
    TagNavComponent ,
    TableComponent,
    LayoutComponent
];

const services = [
    MenuService,
    SessionStorageService,
    LocalStorageService,
    EmitService ,
    NzMessageService,
    MsgService
];

const workbench_services = [
    WorkbenchAll
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        ...layOut
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...layOut
    ],
    providers: [
        ...services,
        ...workbench_services
    ]
})
export class ShareModule { }
