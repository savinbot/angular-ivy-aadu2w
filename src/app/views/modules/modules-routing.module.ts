import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {EditModuleComponent} from './edit-module';
import {ModulesComponent} from './modules.component';
import {ModuleAddComponent} from './module-add';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Modules'
    },
    children: [
      {
        path: '',
        component: ModulesComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'add',
        component: ModuleAddComponent,
        data: {
          title: 'Module Add'
        }
      },
      {
        path: ':id',
        component: EditModuleComponent,
        data: {
          title: 'Module Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
}
