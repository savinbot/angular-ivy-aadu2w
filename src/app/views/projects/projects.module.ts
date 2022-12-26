import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// import components
import { ProjectsComponent} from './projects.component';
import { ProjectAddComponent } from './project-add';
import { EditProjectComponent } from './edit-project';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';


// Components Routing
import { ProjectsRoutingModule} from './projects-routing.module';

@NgModule({
  imports: [
    ProjectsRoutingModule,
    [CommonModule],
    NgxPaginationModule,  // NGX pagination module
    ReactiveFormsModule,        // Reactive forms module
    ToasterModule.forRoot(),
    BsDropdownModule
  ],
  declarations: [
    ProjectsComponent,
    ProjectAddComponent,
    EditProjectComponent
  ]
})
export class ProjectsModule { }
