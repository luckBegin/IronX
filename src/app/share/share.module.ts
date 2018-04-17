import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// component
import { SideMenuComponent } from '../layout/side-menu/side-menu.component' ;
import { TagNavComponent } from '../layout/tag-nav/tag-nav.component' ;
import { LayoutComponent } from '../layout/layout.component' ;
import { TableComponent } from './table/table.component' ;
import { HeaderTitleComponent } from './title/title.component'

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';

import { MenuService } from '../service/menu/menu.service' ;
import { SessionStorageService } from '../service/storage/session_storage' ;
import { LocalStorageService } from '../service/storage/local_storage' ;
import { EmitService } from '../service/event-emit.service' ;
import { MsgService } from '../service/msg/msg.service';

// workbench
import { WorkbenchAll } from '../service/workbench/all.service';

import { DepartService } from '../service/depart/depart.service' ;
import { ProductService } from '../service/product/product.service' ;
import { Userservice } from '../service/user/user.service' ;
import { EnumService } from '../service/enum/enum.service';
import { ImgService } from '../service/img/img.service';
import { CityService } from '../service/city/city.service';

import  { LoginComponent } from '../login/login.component';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http' ;
import { LoginInterceptor } from '../interceptor.service' ;

// pipe
import { AgeByIdPipe } from '../pipe/AgeById.pipe';
import { SexByIdPipe } from '../pipe/SexById.pipe';
const layOut = [
    SideMenuComponent ,
    TagNavComponent ,
    TableComponent,
    LayoutComponent,
    LoginComponent,
    HeaderTitleComponent
];

const services = [
    MenuService,
    SessionStorageService,
    LocalStorageService,
    EmitService ,
    NzMessageService,
    MsgService ,
    EnumService,
    ImgService,
    CityService
];

const workbench_services = [
    WorkbenchAll,
    Userservice
];

const depart_services = [
    DepartService
];

const product_services = [
    ProductService
];

const pipe = [
    AgeByIdPipe ,
    SexByIdPipe
]
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule ,

    ],
    declarations: [
        ...layOut,
        ...pipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...layOut,
        ...pipe
    ],
    providers: [
        ...services,
        ...workbench_services ,
        ...depart_services,
        ...product_services,
        {provide:HTTP_INTERCEPTORS,useClass:LoginInterceptor,multi:true}
    ]
})
export class ShareModule { }
