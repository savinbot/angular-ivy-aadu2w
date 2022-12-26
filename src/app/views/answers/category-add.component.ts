import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})

export class CategorysAddComponent implements OnInit {

  public categoryForm: FormGroup;  // Define FormGroup to category's form
  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    toasterService: ToasterService,
  ) { this.toasterService = toasterService; }


  ngOnInit() {
    this.crudApi.GetCategorysList();  // Call GetCategorysList() before main form is being called
    this.categorysForm();              // Call category form when component is ready
  }

  // Reactive category form
  categorysForm() {
    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  // Accessing form control using getters
  get category_name() {
    return this.categoryForm.get('category_name');
  }

  // Reset category form's values
  ResetForm() {
    this.categoryForm.reset();
  }

  submitCategoryData() {
    this.crudApi.AddCategory(this.categoryForm.value); // Submit category data using CRUD API
    // this.toastr.success(this.answerForm.controls['question'].value + ' - successfully added!'); // Show success message when data is successfully submited
    this.toasterService.pop('success', 'Success', 'Category: ' + this.categoryForm.controls['category_name'].value + ' - successfully added!');
    this.ResetForm();  // Reset form when clicked on reset button
  }

}
