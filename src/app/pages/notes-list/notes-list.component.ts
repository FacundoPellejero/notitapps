import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  filteredNotes: Note[] = new Array<Note>();

  @ViewChild('filterInput', { static: true }) filterInputElRef!: ElementRef<HTMLInputElement>;

  
  constructor(private notesService: NotesService) {
    
  }
  ngOnInit(){
    //Traemos todas las notas desde el servicio
    this.notes = this.notesService.getAll();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number){
    this.notesService.delete(id);
    this.filter(this.filterInputElRef.nativeElement.value)
  }

  filter(query: string){
    query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();

    //divido el filtro por palabras
    let terms: string[] = query.split(' ');
    //elimino duplicados
    terms = this.removeDuplicates(terms);
    //array con resultados relevantes
    terms.forEach(term =>{
      let results = this.relevantNotes(term);
      //agrego el resultado al array de resultados
      allResults = [...allResults, ...results]
    });

    //filtro duplicados de las notas
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;

    //ordena por relevancia (mientras mas aparece un resultado mas relevante)
    this.sortByRelevancy(allResults);

  }

  removeDuplicates(array: Array<any>): Array<any> {
    const uniqueResults: Set<any> = new Set<any>();
    //recorro el array ingresado y los agrego al set que no admite dup
    array.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note>{
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note =>{
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }
      if (note.body && note.body.toLowerCase().includes(query) ) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]){
    //Calcula la relevancia de la nota

    // let noteCountObj: Object = {}; //key.value => NoteId:number (note obj id:count)

    //Refactorizacion de la solucion planteada, utilizando Map en vez de object
    let noteCountMap = new Map<number, number>();

    searchResults.forEach(note => {
      let noteId: number = this.notesService.getId(note);

      if (noteCountMap.has(noteId)) {
        noteCountMap.set(noteId, (noteCountMap.get(noteId) || 0) + 1)
      }
      else {
        noteCountMap.set(noteId, 1);
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) =>{
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      // let aCount = noteCountObj[aId];
      // let bCount = noteCountObj[bId];
      //Refactorizacion utilizando map
      let aCount = noteCountMap.get(aId) || 0;
      let bCount = noteCountMap.get(bId) || 0; //||0 es para evitar errores en el caso de que no exista conteo, devuelve 0
      return bCount - aCount; //aca se aplica una forma de ordenar arrays de JS
    })

  }
}
