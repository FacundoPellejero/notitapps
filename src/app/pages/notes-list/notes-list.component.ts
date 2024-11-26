import { Component, OnInit } from '@angular/core';
import { NoteCardComponent } from "../../note-card/note-card.component";
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';
import { NgFor, UpperCasePipe} from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteCardComponent, NgFor, RouterLink, UpperCasePipe, ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss',
  animations: [
    trigger('itemAnim', [
      //Animacion de entrada
      transition('void => *', [ //va de un estado inexistente (void) a cualquiera
        //Estado inicial
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        //espaciado
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(68),
      ]),

      transition('*=>void', [
        //scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        //scale down - fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        //scale down - fade out
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        //Animacion de espaciado
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('*=>*', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })
      ])
    ])
  ]
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
