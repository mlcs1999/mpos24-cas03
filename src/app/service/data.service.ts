import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  collectionData,
 } from '@angular/fire/firestore';


//MORA DA SE POKLAPA SA BAZOM
export interface Task {
  id?: number;
  name: string;
  category: string;
 }


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

    getTasks() {
    const tasksRef = collection(this.firestore, 'tasks');
    // Observable je ključni koncept u programskom okviru RxJS (Reactive Extensions for JavaScript), koji se koristi za rad sa asinkronim podacima i događajima.
    return collectionData(tasksRef, { idField: 'id' });
  }
}
