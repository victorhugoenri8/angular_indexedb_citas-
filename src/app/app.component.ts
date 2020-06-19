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
                                              objectStore.createIndex('nombreDueno', "nombreDueno", { unique: true});
                                              //objectStore.createIndex('email', 'email', { unique: true });

                                            });
                                          };


    };


guardar(p){
  console.log("hola");

    			this.db.add('practicar', p).then(() => {
        		console.log("se guardo");

    				}, (error) => {
        				//	console.log(error);
    				});
    		};

borrarbase(){
  //borra la base de datos
  let administra=document.getElementById("administra");
  let abajo=document.getElementById("abajo");
      let borrarbase=document.getElementById("borrarbase");
      borrarbase.onclick=()=>{
        this.db.clear('practicar').then(() => {
          this.limpiarDivDeCitas();
                              console.log("se borro base de datos");
                              administra.textContent="Agrega un Registro";
                              abajo.classList.add("text-center");
                              abajo.textContent="Registros vacios";
                            // Do something after clear
                        }, (error) => {
                            console.log(error);
                        });

      };
};

limpiarDivDeCitas(){
  let borrarli=document.querySelector("li");
  let list= borrarli.parentNode;
  while (list.hasChildNodes()) {
                              list.removeChild(list.firstChild);
                              }

     //this.leer();
}


leer(){

          let administra=document.getElementById("administra");
          let abajo=document.getElementById("abajo");
          let div=document.getElementById("citas");
          let newDiv2 = document.createElement("div");
          newDiv2.setAttribute('id', "paraborrar");
          div.appendChild(newDiv2);

        this.db.getAll('practicar').then((people) => {
          people.map(function(n)
                    {
                          //  console.log(n);
                            if(n.texto!=""){
                                              let newDiv = document.createElement("li");

                                                  newDiv.setAttribute('data-cita-id', n.id);
                                                  newDiv.classList.add('list-group-item');
                                                  newDiv.innerHTML=`<p class"font-weight-bold" >Mascota: <span class="font-weight-normal">${n.nombreMascota}</span></p>
                                                                    <p class"font-weight-bold" >Nombre Dueño: <span class="font-weight-normal">${n.nombreDueno}</span></p>
                                                                    <p class"font-weight-bold" >Telefono: <span class="font-weight-normal">${n.telefono}</span></p>
                                                                    <p class"font-weight-bold" >Fecha: <span class="font-weight-normal">${n.fecha}</span></p>
                                                                    <p class"font-weight-bold" >Hora: <span class="font-weight-normal">${n.hora}</span></p>
                                                                    <p class"font-weight-bold" >Sintomas: <span class="font-weight-normal">${n.texto}</span></p>
                                                                    <button type="button"  data-numero=${n.id} id="borrar" class="btn btn-danger">Borrar Registro</button>`;

                                                      newDiv2.appendChild(newDiv);
                                                       administra.innerHTML=`<h3>Administra tus Citas</h3>
                                                                          <button type="button"  id="borrarbase" class="btn btn-info">Borrar Base de Datos</button>`;

                                                        abajo.textContent="";



                                         }else if(n.texto==""){
                                                       administra.textContent="Agrega un Registro";
                                                       abajo.classList.add("text-center");
                                                       abajo.textContent="Registros vacios";
                                                     }

                      });

                       this.borrarbase();
                      let borrar=document.querySelectorAll("button.btn.btn-danger");
                        let self=this;
                          borrar.forEach(function(i){
                            i.addEventListener("click",()=>{

                              self.borrar(Number(i.getAttribute("data-numero")));


                                                                    //borramos el div de citas y volvemos a leer
                                                                        self.limpiarDivDeCitas();

                                                                            self.leer();
                                              })
                        })
                    });
}


borrar(s){
          this.db.delete('practicar', s).then(() => {
          console.log("se borro registro correctamente");

        }, (error) => {
          console.log(error);
        });
}

ngAfterViewInit()
  {
  //  this.leer();
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
                        this.leer();
                        this.text.nativeElement.value="";
                         this.hora.nativeElement.value="";
                          this.fecha.nativeElement.value="";
                          this.telefono.nativeElement.value="";
                          this.nombreDueno.nativeElement.value="";
                          this.nombreMascota.nativeElement.value="";

                  });






        this.base().then(()=>
        {
          this.leer();

          

      })




 }
}
