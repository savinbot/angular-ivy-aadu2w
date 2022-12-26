import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

// import components
import { AnswersComponent } from './answers.component';
import { AnswersdbComponent } from './answersdb.component';
import { AnswersAddComponent } from './answers-add.component';
import { EditAnswerComponent } from './edit-answer.component';
import { CategorysdbComponent } from './categorysdb.component';
import { CategorysAddComponent } from './category-add.component';
import { EditCategoryComponent } from './edit-category.component';

// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';

// Notifications
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';


// Components Routing
import { AnswersRoutingModule } from './answers-routing.module';

@NgModule({
  imports: [
    AnswersRoutingModule,
    [CommonModule],
    NgxPaginationModule,  // NGX pagination module
    ReactiveFormsModule,        // Reactive forms module
    ToasterModule.forRoot()
  ],
  declarations: [
    AnswersComponent,
    AnswersdbComponent,
    AnswersAddComponent,
    EditAnswerComponent,
    CategorysdbComponent,
    CategorysAddComponent,
    EditCategoryComponent
  ]
})
export class AnswersModule { }
