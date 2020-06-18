import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit} from '@angular/core';
import { IndexedDBAngular} from 'indexeddb-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit{
  objeto:{};
datos:any;
tt:any;
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


guardar(p){
  console.log("hola");

    			this.db.add('practicar', p).then(() => {
        		console.log("se guardo");

    				}, (error) => {
        					console.log(error);
    				});
    		};

leer(){
          return this.db.getAll('practicar').then((people) => {
                        console.log(people);
                         return people;
                    }, (error) => {
                        console.log("error al leer la base");
                    });
}


borrar(){
          this.db.delete('practicar', 3).then(() => {
          // Do something after remove
        }, (error) => {
          console.log(error);
        });
}

ngAfterViewInit()
  {
            this.renderer.listen(this.card.nativeElement, 'click', (s) =>
            {
              s.preventDefault();
             let div=document.getElementById("citas");
             while (div.hasChildNodes()) {
                                         div.removeChild(div.firstChild);
                                       };


               let texto:any=  this.text.nativeElement.value;
               let hora:any=  this.hora.nativeElement.value;
               let fecha:any=  this.fecha.nativeElement.value;
               let telefono:number=  this.telefono.nativeElement.value;
               let nombreDueno:any=  this.nombreDueno.nativeElement.value;
               let nombreMascota:any=  this.nombreMascota.nativeElement.value;


                  this.objeto={
                                  nombreDueno: nombreDueno,
                                  nombreMascota: nombreMascota,
                                  telefono: telefono,
                                  fecha: fecha,
                                  hora: hora,
                                  texto: texto
                           };
                        let p:{}=this.objeto;
                        this.guardar(p);

                        this.text.nativeElement.value="";
                         this.hora.nativeElement.value="";
                          this.fecha.nativeElement.value="";
                          this.telefono.nativeElement.value="";
                          this.nombreDueno.nativeElement.value="";
                          this.nombreMascota.nativeElement.value="";

                  });






        this.base().then(()=>
        {
        //  this.guardar();
                // this.datos=this.leer();
                // console.log(this.datos);
                //   this.datos.then((e)=>{
                //                   this.tt=e[0].name;
                //                   console.log(this.tt);
                //                 })


      })

 }
}
