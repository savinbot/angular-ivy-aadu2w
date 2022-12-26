import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnswersdbComponent } from './answersdb.component';
import {AnswersAddComponent} from './answers-add.component';
import {EditAnswerComponent} from './edit-answer.component';
import {CategorysdbComponent} from './categorysdb.component';
import {CategorysAddComponent} from './category-add.component';
import {EditCategoryComponent} from './edit-category.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Answers'
    },
    children: [
      {
        path: 'answerslist',
        component: AnswersdbComponent,
        data: {
          title: 'Answers List'
        }
      },
      {
        path: 'answeradd',
        component: AnswersAddComponent,
        data: {
          title: 'Answer Add'
        }
      },
      {
        path: 'answerslist/:id',
        component: EditAnswerComponent,
        data: {
          title: 'Answer Edit'
        }
      },
      {
        path: 'categoryslist',
        component: CategorysdbComponent,
        data: {
          title: 'Categorys List'
        }
      },
      {
        path: 'categoryadd',
        component: CategorysAddComponent,
        data: {
          title: 'Category Add'
        }
      },
      {
        path: 'categoryslist/:id',
        component: EditCategoryComponent,
        data: {
          title: 'Category Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswersRoutingModule {}
