import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { UpdateTaskPagePage } from '../update-task-page/update-task-page.page';

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
export class HomePage implements OnInit {
  today: number = Date.now();
  tasks: Array<Task> = [];

  constructor(public modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.tasks = [
      {
        name: 'Zadatak 1',
        date: new Date(),
        category: 'Low'
      },
      {
        name: 'Zadatak 2',
        date: new Date(),
        category: 'High'
      }
    ]
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
