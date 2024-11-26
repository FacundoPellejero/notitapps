import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from "../../note-card/note-card.component";
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteCardComponent, NgFor, RouterLink],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit {
  
  notes: Note[] = new Array<Note>();
  
  constructor(private notesService: NotesService) {
    
  }
  ngOnInit(){
    //Traemos todas las notas desde el servicio
    this.notes = this.notesService.getAll();
  }

  deleteNote(id: number){
    this.notesService.delete(id);
  }
}
