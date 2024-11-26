import { Routes } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';

export const routes: Routes = [
    { path: '', component: MainLayoutComponent, children: [
        {path: 'new', component: NoteDetailsComponent},
        {path: '', component: NotesListComponent},
        {path: ':id', component: NoteDetailsComponent}
    ]},

];
