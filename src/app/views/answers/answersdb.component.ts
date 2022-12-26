import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { Answers} from '../../shared/answers';


@Component({
  selector: 'app-answersdb',
  templateUrl: './answersdb.component.html',
  styleUrls: ['./answersdb.component.css']
})

export class AnswersdbComponent implements OnInit {
  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Answer: Answers[];                 // Save answers data in Answer's array.
  hideWhenNoAnswer = false; // Hide answers data table when no answer.
  noData = false;            // Showing No Answer Message, when no answer in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  constructor(
    public crudApi: CrudService, // Inject answer CRUD services in constructor.
    ) { }


  ngOnInit() {
    this.dataState(); // Initialize answer's list, when component is ready
    let s = this.crudApi.GetAnswersList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Answer = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Answer.push(a as Answers);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of answers data. It updates the state of hideWhenNoAnswer, noData & preLoader variables when any changes occurs in answer data list in real-time.
  dataState() {
    this.crudApi.GetAnswersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoAnswer = false;
        this.noData = true;
      } else {
        this.hideWhenNoAnswer = true;
        this.noData = false;
      }
    })
  }

  // Method to delete answer object
  deleteAnswer(answer) {
    if (window.confirm('Are sure you want to delete this answer ?')) { // Asking from user before Deleting answer data.
      this.crudApi.DeleteAnswer(answer.$key) // Using Delete answer API to delete answer.
      // this.toastr.success(answer.firstName + ' successfully deleted!'); // Alert message will show up when answer successfully deleted.
    }
  }

}
