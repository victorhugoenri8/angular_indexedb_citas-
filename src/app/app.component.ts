import { Component, ViewChild, ElementRef, Renderer2} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  objeto:{};

//public leer:any='hola';
    @ViewChild('boton', { static: false}) card: ElementRef;
    @ViewChild('text', { static: false}) text: ElementRef;
    @ViewChild('nombreDueno', { static: false}) nombreDueno: ElementRef;
    @ViewChild('nombreMascota', { static: false}) nombreMascota: ElementRef;
    @ViewChild('numeroTel', { static: false}) telefono: ElementRef;
    @ViewChild('fecha', { static: false}) fecha: ElementRef;
    @ViewChild('hora', { static: false}) hora: ElementRef;
    @ViewChild('citas') animateThis: ElementRef;
    @ViewChild('borrando', { static: false}) borrando: ElementRef;
    private db = new IndexedDBAngular('myDb', 1);
    constructor() { this.db.createStore(1, this.createCollections);}
    createCollections(db) {
        db.currentTarget.result.createObjectStore('exampleCollection1');
        db.currentTarget.result.createObjectStore('exampleCollection2');
    }

 }
