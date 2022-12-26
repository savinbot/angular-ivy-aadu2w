import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// import components
import { ModulesComponent} from './modules.component';
import {ModuleAddComponent} from './module-add/module-add.component';
import {EditModuleComponent} from './edit-module';


// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';


// Components Routing
import { ModulesRoutingModule} from './modules-routing.module';

@NgModule({
  imports: [
    ModulesRoutingModule,
    [CommonModule],
    NgxPaginationModule,  // NGX pagination module
    ReactiveFormsModule,        // Reactive forms module
    ToasterModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule
  ],
  declarations: [
    ModulesComponent,
    ModuleAddComponent,
    EditModuleComponent
  ]
})
export class ModulesModule { }
