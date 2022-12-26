import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {Categorys} from '../../shared/categorys';

@Component({
  selector: 'app-edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.css']
})

export class EditAnswerComponent implements OnInit {
  public editForm: FormGroup;  // Define FormGroup to answer's edit form
  private toasterService: ToasterService;
  Category: Categorys[];

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });
  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    toasterService: ToasterService,
    // private toastr: ToastrService       // Toastr service for alert message
  ) { this.toasterService = toasterService; }

  ngOnInit() {
    this.updateAnswerData();   // Call updateAnswerData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetAnswer(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    })
    let s = this.crudApi.GetCategorysList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Category = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Category.push(a as Categorys);
      })
    })
  }

  // Accessing form control using getters
  get answer_category() {
    return this.editForm.get('answer_category');
  }


  get question() {
    return this.editForm.get('question');
  }

  get answer() {
    return this.editForm.get('answer');
  }
  // Contains Reactive Form logic
  updateAnswerData() {
    this.editForm = this.fb.group({
      answer_category: ['', [Validators.required, Validators.minLength(1)]],
      question: ['', [Validators.required, Validators.minLength(1)]],
      answer: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.UpdateAnswer(this.editForm.value);       // Update answer data using CRUD API
    this.toasterService.pop('success', 'Success', 'Answer: ' + this.editForm.controls['question'].value + ' - successfully edited!');   // Show succes message when data is successfully submited
    setTimeout(() => {
      this.location.back()
    }, 1500);               // Navigate to answer's list page when answer data is updated
  }

}
