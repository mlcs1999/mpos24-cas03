import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { UpdateTaskPagePage } from '../update-task-page/update-task-page.page';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';


type Task = {
  name?: string,
  date?: Date,
  category?: string,
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  today: number = Date.now();
  // tasks: Array<Task> = [];
  tasks: any;
  sub: Subscription = new Subscription;

  constructor(public modalCtrl: ModalController, private dataService: DataService) { }

  //It implements the OnDestroy lifecycle hook, which is a method that Angular calls when the component 
  //is about to be destroyed.
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.tasks = this.getData();
  }

// async getData(): Asinhrona funkcija koja pretplaćuje komponentu na podatke iz dataService-a.
// this.dataService.getTasks(): Poziva metod getTasks() iz DataService servisa, koji vraća Observable sa listom zadataka.
// this.sub = ...subscribe(...): Pretplaćuje se na Observable i po prijemu rezultata ažurira tasks sa dobijenim podacima (res).
  async getData() {
    this.sub = this.dataService.getTasks().subscribe((res) => {
    this.tasks = res;
    console.log(this.tasks);
    });
  }

  async goToAddPage() {
    const modal = await this.modalCtrl.create(
      {
        component: AddNewTaskPage
      }
    )
    return await modal.present();
  }

  async goToUpdatePage(task: Task) {
    const modal = await this.modalCtrl.create(
      {
        component: UpdateTaskPagePage,
        componentProps: task
      }
    )
    return await modal.present();
  }

}
