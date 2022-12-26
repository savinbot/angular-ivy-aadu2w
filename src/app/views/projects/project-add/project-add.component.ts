import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import {Router} from '@angular/router';


@Component({
  selector: 'app-projects-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})

export class ProjectAddComponent implements OnInit {
  public project_status = true;
  public project_type = 'channel';

  public projectForm: FormGroup;  // Define FormGroup to answer's form

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private toasterService: ToasterService,
    private router: Router
    // public toastr: ToastrService  // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.crudApi.GetProjectsList();  // Call GetAnswersList() before main form is being called
    this.projectsForm();              // Call answer form when component is ready
  }

  // Go back to previous component
  goBack() {
    this.router.navigate(['/projects']);
  }

  // Reactive answer form
  projectsForm() {
    this.projectForm = this.fb.group({
      project_status: [''],
      project_type: [''],
      project_type_link: ['', [Validators.required, Validators.minLength(1)]],
      project_name: ['', [Validators.required, Validators.minLength(1)]],
      telegram_token: ['', [Validators.required, Validators.minLength(45), Validators.maxLength(45)]]
    });
  }
  project_name() {
    return this.projectForm.get('project_name');
  }

  project_type_link() {
    return this.projectForm.get('project_type_link');
  }

  telegram_token() {
    return this.projectForm.get('telegram_token');
  }

  // Reset answer form's values
  ResetForm() {
    this.projectForm.reset({project_status: this.project_status = true});
  }

  submitProjectData() {
    this.crudApi.AddProject(this.projectForm.value); // Submit answer data using CRUD API
    // this.toastr.success(this.answerForm.controls['question'].value + ' - successfully added!'); // Show success message when data is successfully submited
    this.toasterService.pop('success', 'Success', 'Project: ' + this.projectForm.controls['project_name'].value + ' - successfully added!');
    setTimeout(() => {
      this.router.navigate(['/projects']);
      this.ResetForm();  // Reset form when clicked on reset button
    }, 1500);
  }

}
