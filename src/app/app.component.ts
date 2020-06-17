import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { IndexedDBAngular} from 'indexeddb-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit{
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
db:IndexedDBAngular = new IndexedDBAngular('practica', 1);
base:any;
    constructor(private renderer: Renderer2,) {
      this.base= function()
                       {
               return this.db.createStore(1, (evt:any) =>
                                      {     let objectStore = evt.currentTarget.result.createObjectStore('practicar', { keyPath: 'id', autoIncrement: true }, { unique: true});
                                            //crea el indice
                                              objectStore.createIndex('name', "name", { unique: true});
                                              //objectStore.createIndex('email', 'email', { unique: true });

                                            });
                                          };


    };


guardar(){
  console.log("hola");

    			this.db.add('practicar', { name: 'name', email: 'email' }).then(() => {
        		console.log("se guardo");

    				}, (error) => {
        					console.log(error);
    				});
    		};




ngAfterViewInit(){
  this.base().then(()=>{
    this.guardar()
  })

}
 }
