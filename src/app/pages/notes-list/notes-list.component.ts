import { Component } from '@angular/core';
import { NoteCardComponent } from "../../note-card/note-card.component";

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteCardComponent],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent {
  
  
  
  constructor() {
    
  }
  ngOnInit(){

  }

}
