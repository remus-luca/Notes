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

  ngOnInit(): void {}

  addNote() {
    const { value } = this.noteForm;
    console.log(value);
    this.noteObj.id = '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_desc = value.description;
  }
}
