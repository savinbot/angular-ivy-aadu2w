import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CrudService } from '../../shared/crud.service';  // CRUD API service class
import { Categorys } from '../../shared/categorys';


@Component({
  selector: 'app-categorysdb',
  templateUrl: './categorysdb.component.html',
  styleUrls: ['./categorysdb.component.css']
})

export class CategorysdbComponent implements OnInit {
  p = 1;                      // Fix for AOT compilation error for NGX pagination
  Category: Categorys[];                 // Save answers data in Category's array.
  hideWhenNoCategory = false; // Hide answers data table when no answer.
  noData = false;            // Showing No Category Message, when no answer in database.
  preLoader = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  constructor(
    public crudApi: CrudService, // Inject answer CRUD services in constructor.
    ) { }


  ngOnInit() {
    this.dataState(); // Initialize category's list, when component is ready
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

  // Using valueChanges() method to fetch simple list of answers data. It updates the state of hideWhenNoAnswer, noData & preLoader variables when any changes occurs in answer data list in real-time.
  dataState() {
    this.crudApi.GetCategorysList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoCategory = false;
        this.noData = true;
      } else {
        this.hideWhenNoCategory = true;
        this.noData = false;
      }
    })
  }

  // Method to delete answer object
  deleteCategory(category) {
    if (window.confirm('Are sure you want to delete this category ?')) { // Asking from user before Deleting answer data.
      this.crudApi.DeleteCategory(category.$key) // Using Delete answer API to delete answer.
      // this.toastr.success(answer.firstName + ' successfully deleted!'); // Alert message will show up when answer successfully deleted.
    }
  }

}
