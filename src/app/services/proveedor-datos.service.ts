import{ HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

import { IData } from '../../interfaces/data.interfacepedidos';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})

export class ProveedorDatosService {

  private dataUrl: string = "assets/json/pedidos.json"

  private urlService: string = "http://190.60.254.186/Publicada/api"
  
  private urlServiceTodos: string = "https://localhost:44341/api/TmpDT_3k_Entregas"

  //private urlService: string = "https://localhost:44341/api";

  constructor(private http: HttpClient, public navCtrl: NavController, public geolocation: Geolocation) { 
    this.getLatitud();
    this.getLongitud();
  }

  latitud: number = 0;
  longitud: number = 0;

  getDataLocalStorage(): Observable<IData[]> {
    return this.http.get<IData[]>(this.dataUrl)
  }  
  
  getData(): Observable<IData[]> {
    return this.http.get<IData[]>(`${this.urlService}/TmpDT_3k_Entregas`)
  }

  putData(id: string, datos: any){
    let urlServiceEditar: string = `${this.urlService}/TmpDT_3k_Entregas/` + id;
    console.log(' url: ' + urlServiceEditar);
    return this.http.put(urlServiceEditar, datos).subscribe(data => 
        console.log('response ' + data)
      );
  }

  getLatitud(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      //console.log('servicio ' + geoposition.coords.latitude);
      this.latitud = geoposition.coords.latitude;
    })
  }

  getLongitud(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.longitud = geoposition.coords.longitude;
    });
  }

}
