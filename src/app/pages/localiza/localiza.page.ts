import { Component, OnInit } from '@angular/core';

import { ProveedorDatosService } from '../../services/proveedor-datos.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { LoadingController } from '@ionic/angular';
import { Marker } from '../localiza/model/localiza.interface';
import { WayPoint } from '../localiza/model/waypoint.interface';
import { Coordenadas } from '../localiza/model/coordenadas.interface';

declare var google;

@Component({
  selector: 'app-localiza',
  templateUrl: './localiza.page.html',
  styleUrls: ['./localiza.page.scss'],
})
export class LocalizaPage implements OnInit {

  map: any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  destination: Coordenadas;

  origin: Coordenadas;

  /*destination = { lat: 4.676802158355713, lng: -74.04825592041016 };

  //origin = { lat: 4.658383846282959, lng: -74.09394073486328 };

  
  latitud: number = 0;
  longitud: number = 0;

  latitudDestino: number = 0;
  longitudDestino: number = 0;

  markers: Marker[] = [
    {
      position: {
        lat: this.origin.lat
        lng: this.origin.lng
      },
      title: 'Ubicación',
    },
    {
      position: {
        lat: this.destination.lat,
        lng: this.destination.lng
      },
      title: 'Jardín Botánico'
    },
  ];*/

  constructor(public _logic: ProveedorDatosService) {
    
    //this.origin = { lat: 4.658383846282959, lng: -74.09394073486328 };
    this.origin = { lat: _logic.latitud, lng: _logic.longitud };
    //this.destination = { lat: 4.676802158355713, lng: -74.04825592041016 };
    this.destination = { lat: 4.676802158355713, lng: -74.04825592041016 };
  }

  ngOnInit() {
    
    //this.latitud = this._logic.latitud;
    //this.longitud = this._logic.longitud;
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    
    const indicatorsEle: HTMLElement = document.getElementById('indicators');

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.calculateRoute();
      //this.renderMarkers();
    });

  }

  /*renderMarkers() {
    console.log('entro al render');
    console.log('lat ' + this.latitud);
    console.log('log ' + this.longitud);
    console.log('latitudDestino ' + this.latitudDestino);
    console.log('longitudDestino ' + this.longitudDestino)

    console.log('cantidad: ' + this.markers.length);

    this.markers.forEach(marker => {
      console.log('entro al foreach: ' + marker.position.lat + ' | ' + marker.position.lng)
      this.addMarker(marker);
    });
  }*/

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }


  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
}