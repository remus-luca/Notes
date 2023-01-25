import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private fireStore: Firestore) {}
}
