import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CrudService} from '../../../shared/crud.service';
import {ActivatedRoute, Router} from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})

export class EditProjectComponent implements OnInit {
  public editForm: FormGroup;  // Define FormGroup to answer's edit form

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(
    private crudApi: CrudService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toasterService: ToasterService,
    // private toastr: ToastrService       // Toastr service for alert message
  ) {
  }

  ngOnInit() {
    this.updateProjectData();   // Call updateAnswerData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetProject(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
    });
  }

  project_status() {
    return this.editForm.get('project_status');
  }

  project_name() {
    return this.editForm.get('project_name');
  }

  project_type() {
    return this.editForm.get('project_type');
  }

  project_type_link() {
    return this.editForm.get('project_type_link');
  }

  telegram_token() {
    return this.editForm.get('telegram_token');
  }

  // Contains Reactive Form logic
  updateProjectData() {
    this.editForm = this.fb.group({
      project_status: [''],
      project_type: [''],
      project_type_link: ['', [Validators.required, Validators.minLength(1)]],
      project_name: ['', [Validators.required, Validators.minLength(1)]],
      telegram_token: ['', [Validators.required, Validators.minLength(45), Validators.maxLength(45)]]
    })
  }

  // Go back to previous component
  goBack() {
    this.router.navigate(['/projects']);
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.UpdateProject(this.editForm.value);       // Update answer data using CRUD API
    this.toasterService.pop('success', 'Success', 'Project: ' + this.editForm.controls['project_name'].value + ' - successfully edited!');   // Show succes message when data is successfully submited
    setTimeout(() => {
      this.router.navigate(['/projects']);
    }, 1500);
  }

}
