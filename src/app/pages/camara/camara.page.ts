import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProveedorDatosService } from '../../services/proveedor-datos.service';
import { Observable } from "rxjs";
import { IData } from '../../../interfaces/data.interfacepedidos';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Photo } from './model/photo.interface';
import { ActivatedRoute } from '@angular/router';
import { AlistardatosPage } from '../alistardatos/alistardatos.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {    

    public photos: Photo[] = [];
    public buttonState: boolean = true;
    public pedido = null;
    public pedidos = [];

    constructor(private photoService: PhotoService, private activeRoute : ActivatedRoute, private alDatos : AlistardatosPage, private alertCtrl: AlertController, private router: Router) {
        this.photos = photoService.getPhotos();
        
    }

    public newPhoto(): void{
        this.photoService.addNewToGallery();
        this.buttonState = !this.buttonState;    
           
    }    

    public clickSave(){
        this.buttonState = !this.buttonState;
        this.openAlert();
    }

    clickCancel(){
        this.buttonState = !this.buttonState;
        this.resetPhotos();
    }
    
    saveData(){
        let validacion = 0;
        console.log('entro metodo guardar ');
        this.pedidos.map(item =>{
            if(item.Pedido === this.pedido.Pedido){
                let prueba: any;
                this.photoService.readAsBase64(JSON.parse(window.localStorage.getItem('photo'))).then((itemF) => {
                    //const byteCharacters = atob(itemF);
                    item.Foto = itemF;                    
                    item.Estado = 1;
                    this.alDatos.regrabar_JSON_enLocalStorage(this.pedidos);
                    this.resetPhotos();
                })
            }
        });
    }
    
    resetPhotos(){
        this.photos = [];
    }

    ngOnInit() {
        this.pedido = JSON.parse(window.localStorage.getItem('pedido_actualizar'));
        this.pedidos = JSON.parse(window.localStorage.getItem('pedidos'));        
    }
    
    arreglaHora() {
        let date = new Date();
        let min = date.getMinutes().toString();
        if (date.getMinutes() < 10) {
          min = '0' + date.getMinutes();
        }
        return 'Hora: ' + date.getHours() + ':' + min;
    
      }

    //Metodo de confirmacion a la hora de entregar un pedido
  async openAlert() {
    let HoraInicio = new Date();
    const alert = await this.alertCtrl.create({
      header: 'Confirmar entrega \n\n',
      subHeader: 'Fecha: ' + HoraInicio.getDate() + '/' + (HoraInicio.getMonth() + 1).toString() + '/' + HoraInicio.getFullYear(),
      message: this.arreglaHora(),

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            this.saveData();
            this.router.navigateByUrl('/home');  
          }
        }
      ]
    });
    await alert.present();
  }

  
  }
