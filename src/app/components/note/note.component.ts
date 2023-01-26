import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  noteForm: FormGroup;
  notesData: any = [];

  noteObj: Note = {
    id: '',
    note_title: '',
    note_desc: '',
  };

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    this.noteObj.id = '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_desc = value.description;

    this.noteService.addNote(this.noteObj).then((note) => {
      this.noteForm.reset();
    });
  }

  getAllNotes() {
    this.noteService.getNotes().subscribe((res: Note[]) => {
      this.notesData = res;
    });
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note);
  }
}
