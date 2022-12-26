import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProjectAddComponent} from './project-add';
import {EditProjectComponent} from './edit-project';
import {ProjectsComponent} from './projects.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Projects'
    },
    children: [
      {
        path: '',
        component: ProjectsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'add',
        component: ProjectAddComponent,
        data: {
          title: 'Project Add'
        }
      },
      {
        path: ':id',
        component: EditProjectComponent,
        data: {
          title: 'Project Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
