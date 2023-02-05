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
  editForm: FormGroup;
  notesData: any = [];
  noteDetails: any;

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
    this.editForm = fb.group({
      edit_title: ['', Validators.required],
      edit_description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  addNote() {
    const { value } = this.noteForm;
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
  getAllDetails(note: Note) {
    this.noteDetails = note;
  }

  deleteNote(note: Note) {
    this.noteService.deleteNote(note);
  }

  updateNote(note: Note) {
    const { value } = this.editForm;
    this.noteObj.id = note.id;
    this.noteObj.note_title = value.edit_title;
    this.noteObj.note_desc = value.edit_description;
    this.noteService.updateNote(note, this.noteObj).then(() => {
      alert('Updated successfully');
    });
    this.editForm.reset();
  }
}
