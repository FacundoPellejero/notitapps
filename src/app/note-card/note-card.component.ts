import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss'
})
export class NoteCardComponent {


  @Input() cardTitle!: string;
  @Input() cardBody!: string;
  @Input() link!: string;

  //Emite un evento que 'escucha' el contenedor padre (note-list)
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('truncator', { static: true }) truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {
    
  }
  ngOnInit(){
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      //si hay overflow muestro el truncador
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      //si no lo oculto con display: none
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none')
    }



  }

  onXButtonClick(){
    this.deleteEvent.emit();
  }

}
