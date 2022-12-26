import {Injectable} from '@angular/core';
import {Answers} from './answers';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Categorys} from './categorys';  // Firebase modules for Database, Data list and Single object
import {Projects} from './projects';  // Firebase modules for Database, Data list and Single object
import {ProjectsModules} from './projects-modules';
import {CrudConstants} from './crud.constants';
import {StorageService} from '../core/storage/storage.service';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  answersRef: AngularFireList<any>;    // Reference to Answer data list, its an Observable
  answerRef: AngularFireObject<any>;   // Reference to Answer object, its an Observable too
  modulesRef: AngularFireList<any>;    // Reference to Module data list, its an Observable
  projectsModulesRef: AngularFireList<any>;    // Reference to Module data list, its an Observable
  moduleRef: AngularFireObject<any>;   // Reference to Module object, its an Observable too
  categorysRef: AngularFireList<any>;    // Reference to Answer data list, its an Observable
  categoryRef: AngularFireObject<any>;   // Reference to Answer object, its an Observable too
  projectsRef: AngularFireList<any>;    // Reference to Answer data list, its an Observable
  projectRef: AngularFireObject<any>;   // Reference to Answer object, its an Observable too
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {
  }

  // Create Answer
  AddAnswer(answer: Answers) {
    this.answersRef.push({
      answer_category: answer.answer_category,
      question: answer.question,
      answer: answer.answer
    });
  }

  // Create Category
  AddCategory(category: Categorys) {
    this.categorysRef.push({
      category_name: category.category_name
    });
  }

  // Create Project
  AddProject(project: Projects) {
    this.projectsRef.push({
      project_status: project.project_status,
      project_name: project.project_name,
      project_type: project.project_type,
      project_type_link: project.project_type_link,
      telegram_token: project.telegram_token
    });
  }

  // Fetch Single Answer Object
  GetAnswer(id: string) {
    this.answerRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/aq_db/${id}`);
    return this.answerRef;
  }

  // Fetch Single Category Object
  GetCategory(id: string) {
    this.categoryRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/qaq_cat_db/${id}`);
    return this.categoryRef;
  }

  // Fetch Single Project Object
  GetProject(id: string) {
    this.projectRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.PROJECTS}/${id}`);
    return this.projectRef;
  }

  // Fetch Answers List
  GetAnswersList() {
    this.answersRef = this.db.list(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/aq_db`);
    return this.answersRef;
  }

  // Fetch Categorys List
  GetCategorysList() {
    this.categorysRef = this.db.list(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/qaq_cat_db`);
    return this.categorysRef;
  }

  // Fetch Projects List
  GetProjectsList() {
    this.projectsRef = this.db.list(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.PROJECTS}`);
    return this.projectsRef;
  }

  // Fetch Projects Modules List
  GetProjectsModulesList() {
    this.projectsModulesRef = this.db.list(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.PROJECTS}`);
    return this.projectsModulesRef;
  }

  // Fetch New Modules List
  GetModulesList() {
    this.modulesRef = this.db.list(`${CrudConstants.MODULES}`);
    return this.modulesRef;
  }

  // Update Answer Object
  UpdateAnswer(answer: Answers) {
    this.answerRef.update({
      answer_category: answer.answer_category,
      question: answer.question,
      answer: answer.answer
    });
  }

  // Update Category Object
  UpdateCategory(category: Categorys) {
    this.categoryRef.update({
      category_name: category.category_name
    });
  }

  // Update Project Object
  UpdateProject(project: Projects) {
    this.projectRef.update({
      project_status: project.project_status,
      project_name: project.project_name,
      project_type: project.project_type,
      project_type_link: project.project_type_link,
      telegram_token: project.telegram_token

    });
  }

  // Delete Answer Object
  DeleteAnswer(id: string) {
    this.answerRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/aq_db/${id}`);
    this.answerRef.remove();
  }

  // Delete Category Object
  DeleteCategory(id: string) {
    this.categoryRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.MODULES}/aq/qaq_cat_db/${id}`);
    this.categoryRef.remove();
  }

  // Delete Project Object
  DeleteProject(id: string) {
    this.projectRef = this.db.object(`${CrudConstants.USERS}/${StorageService.get(CrudConstants.ID)}/${CrudConstants.PROJECTS}/${id}`);
    this.projectRef.remove();
  }
}
