import { Component } from '@angular/core';
import { ProveedorDatosService } from '../../services/proveedor-datos.service';
import { Observable } from "rxjs";
import { IData } from '../../../interfaces/data.interfacepedidos';

@Component({
  selector: 'app-revisar-estado',
  templateUrl: './revisar-estado.page.html'
})

export class RevisarEstado {

  pedidos$: Observable<IData[]>;
  totalRegistros: number;
  seleccion;
  constructor() {

    this.cargar_datos_desde_LocalStorage();

  }

  buscar($event){
    this.seleccion = $event.target.value;
    console.log("datos" + $event.target.value);    
  }

  cargar_datos_desde_LocalStorage(){
    this.pedidos$ = JSON.parse(window.localStorage.getItem('pedidos'));
  }

}