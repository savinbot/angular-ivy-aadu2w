import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to category's edit form

  private toasterService: ToasterService;

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
  ) { this.toasterService = toasterService; }

  ngOnInit() {
    this.updateCategoryData();   // Call updateCategoryData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetCategory(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    })
  }

  // Accessing form control using getters
  get category_name() {
    return this.editForm.get('category_name');
  }
  // Contains Reactive Form logic
  updateCategoryData() {
    this.editForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.UpdateCategory(this.editForm.value);       // Update category data using CRUD API
    this.toasterService.pop('success', 'Success', 'Category: ' + this.editForm.controls['category_name'].value + ' - successfully edited!');   // Show succes message when data is successfully submited
    setTimeout(() => {
      this.location.back()
    }, 1500);               // Navigate to answer's list page when answer data is updated
  }

}
