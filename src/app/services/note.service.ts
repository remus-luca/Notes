import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Note } from '../note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private fireStore: Firestore) {}

  addNote(note: Note) {
    note.id = doc(collection(this.fireStore, 'id')).id;
    return addDoc(collection(this.fireStore, 'Notes'), note);
  }

  getNotes(): Observable<Note[]> {
    let notes = collection(this.fireStore, 'Notes');
    return collectionData(notes, { idField: 'id' }) as Observable<Note[]>;
  }

  deleteNote(note: Note) {
    let docRef = doc(this.fireStore, `Notes/${note.id}`);
    return deleteDoc(docRef);
  }

  updateNote(note: Note, notes: any) {
    let docRef = doc(this.fireStore, `Notes/${note.id}`);
    return updateDoc(docRef, notes);
  }
}
