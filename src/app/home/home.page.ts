import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ProveedorDatosService } from '../services/proveedor-datos.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData } from '../../interfaces/data.interfacepedidos';
// import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { exit } from 'process';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { AlistardatosPage } from '../pages/alistardatos/alistardatos.page'
import { ActionSheetController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  items: any = [];
  pedidos$: any = [];
  name_model: string = "";
  pedidosb = new BehaviorSubject([]);

  restantes: number = 0;
  entregados: number = 0;
  noEntregados: number = 0;

  latitud: number = 0;
  longitud: number = 0;

  constructor(private alDatos: AlistardatosPage, private menuCtrl: MenuController, public _logic: ProveedorDatosService, private alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public toastController: ToastController, private router: Router, public modalController: ModalController) {
    //let HoraInicio = new Date();
    //console.log(HoraInicio);

    this.cargar_datos_desde_LocalStorage(); //carga los datos al localStorage    
    this.cargarContadores();
  }

  ngOnInit() { 
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter');    
    this.cargar_datos_desde_LocalStorage();
    this.cargarContadores();
  }

  async presentModal(pedido: any) {
    const alert = await this.actionSheetCtrl.create({
      header: 'Acciones',
      buttons: [
        {
          text: 'Entrega efectiva',
          role: 'selected',
          icon: 'checkbox-outline',
          handler: () => {
            this.openAlert(pedido);
          }
        },{
          text: 'Entrega no efectiva',
          role: 'selected',
          icon: 'close-circle-outline',
          handler: () => {
            this.pedidoCanceladoAlert(pedido)
          }
        }/*,{
          text: 'Ruta',
          role: 'destructive',
          icon: 'navigate-circle-outline',
          handler: () => {
            this.ruta(pedido);
          }
        }*/
      ]
    });
    await alert.present();
    /*
    window.localStorage.setItem( "pedido_actualizar", JSON.stringify(pedido));
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();*/
  }

  ruta(pedido: any){
    this.router.navigateByUrl('/localiza');
  }

  async presentActionSheet() {
    const alert = await this.actionSheetCtrl.create({
      header: 'Contadores',
      buttons: [
        {
          text: 'Restantes:  ' + this.restantes,
          role: 'selected',
          icon: 'list-circle-outline'
        },{
          text: 'Entregados:  ' + this.entregados,
          role: 'selected',
          icon: 'checkbox-outline'
        },{
          text: 'No entregados:  ' + this.noEntregados,
          role: 'destructive',
          icon: 'close-circle-outline'
        }
      ]
    });
    await alert.present();
  }

  cargarContadores() {
    if(this.pedidos$ !== null){
      this.entregados = 0;
      this.restantes = 0;
      this.noEntregados = 0;
      for (let numero of this.pedidos$) {
        if (numero.Estado === 1) {
          this.entregados++;
        }
        if (numero.Estado === 2) {
          this.restantes++;
        }
        if (numero.Estado === 3) {
          this.noEntregados++;
        }
      }
    }
  }

  async popUpContadores(pedido: any) {
    const alert = await this.alertCtrl.create({
      header: 'Indique la ',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Observación'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cerrar');
          }
        }
      ]
    });
    await alert.present();
  }

  
  cargar_datos_desde_LocalStorage() {
    this.pedidos$ = JSON.parse(window.localStorage.getItem('pedidos'));
  }

  pasarDatosParaActualizar(pedido) {
    this.name_model = pedido.DestinoFinal;
  }

  //Metodo de confirmacion a la hora de entregar un pedido
  async openAlert(pedido: any) {
    let HoraInicio = new Date();
    const alert = await this.alertCtrl.create({
      header: '¿Esta seguro? \n\n',
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
            //window.localStorage.setItem( "pedido_actualizar", JSON.stringify(pedido));
            this.actualizarPedido(pedido);
            //this.router.navigateByUrl('/camara');  
          }
        }
      ]
    });
    await alert.present();
  }

  async pedidoCanceladoAlert(pedido: any) {
    let alert = await this.alertCtrl.create({
      header: 'Especifique la razón',
      inputs: [
        {
          type: 'radio',
          label: 'Razón 1',
          value: 1
        },
        {
          type: 'radio',
          label: 'Razón 2',
          value: 2
        },
        {
          type: 'radio',
          label: 'Razón 3',
          value: 3
        },
        {
          type: 'radio',
          label: 'Razón 4',
          value: 4
        },
        {
          type: 'radio',
          label: 'Razón 5',
          value: 5
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.toastConfirmacion('Operación cancelada.', 'light')
          }
        },
        {
          text: 'OK',
          handler: data => {
            if(JSON.stringify(data) !== undefined){
              this.cancelarPedido(pedido, Number.parseInt(JSON.stringify(data)));
              this.toastConfirmacion('Entrega no efectiva del pedido.', 'success')  
            }else{
              this.toastConfirmacion('Por favor seleccione una opción.', 'warning')  
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async toastConfirmacion(mensaje, colorT) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: colorT,
      duration: 2000
    });
    toast.present();
  }

  arreglaHora() {
    let date = new Date();
    let min = date.getMinutes().toString();
    if (date.getMinutes() < 10) {
      min = '0' + date.getMinutes();
    }
    return 'Hora: ' + date.getHours() + ':' + min;

  }

  actualizarPedido(pedido: any) {
    let date = new Date();
    this.pedidos$.map(item => {
      if (item.Pedido === pedido.Pedido) {
        item.Entrega_Fec = date;
        item.Lat = 0;
        item.Lng = 0;
        item.Estado = 5;
        //item.Lat = this.latitud = this._logic.latitud;
        //item.Lng = this.longitud = this._logic.longitud;        
      }
    });
    this.alDatos.regrabar_JSON_enLocalStorage(this.pedidos$);
  }

  cancelarPedido(pedido: any, causal: number) {
    let date = new Date();
    this.pedidos$.map(item => {
      if (item.Pedido === pedido.Pedido) {
        item.Estado = 7;
        item.Causal_Id = causal;
        item.Entrega_Fec = date;
        item.Lat = 0; //this.latitud = this._logic.latitud;
        item.Lng = 0; //this.longitud = this._logic.longitud;
      }
    });
    this.alDatos.regrabar_JSON_enLocalStorage(this.pedidos$);
    this.cargarContadores();
  }

  updateRow(pedido) {
    //console.log(pedido);
    for (let numero of this.pedidos$) {
      let i: number = 0
      if (numero.DestinoFinal === this.name_model)
        i = i + 1
      {
        console.log('Entra ' + numero.Estado);
        console.log('EntraArray ' + this.pedidos$[i].Pedido);
        this.pedidos$[i].Estado = 2
        numero.Estado = 2
        console.log(numero.Pedido);
        console.log('Sale ' + numero.Estado);
        console.log('SaleArray ' + this.pedidos$[i].Estado);
        break;
      }

      if (false) {
        console.log('This will never executed.');
      }
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  
}

  /*constructor( private sqlitePorter: SQLitePorter, private http: HttpClient, private plt: Platform, private menuCtrl: MenuController,public _logic: ProveedorDatosService, private sqlite: SQLite) {
    let HoraInicio = new Date() ;

    console.log(HoraInicio);
    this.cargar_datos_desde_LocalStorage();
    let HoraFinal = new Date() ;
    console.log('Ok');
    console.log(HoraFinal);

    this.plt.ready().then(() => {
      this.sqlite.create({
          name: "items.db", 
          location: "default"
        })
        .then((db : SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        }, (error) => {
          console.log("ERROR: ", error);
        });   
    })
    
    this.getDatabaseState().subscribe(ready => {
        this.addDeveloper();
        this.consultar();
        console.log(this.pedidosb);
    })
    //SQLite init
    this.sqlite.create({
      name: 'items.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        this.database = db;  
        db.executeSql(`
          CREATE TABLE IF NOT EXISTS pedidos (pid INTEGER PRIMARY KEY, Pedido TEXT, 
          DestinoFinal TEXT, Depto TEXT, Ciudad TEXT, Direccion TEXT, Tel TEXT, Relacion_Id TEXT, 
          Relacion_Fec TEXT, Estado TEXT, Causal_Id TEXT, Entrega_Fec TEXT))
        `, [])
          .then(() => console.log('SQL Ejecutado correctamente'))
          .catch(e => console.log(e));    
      })
      .catch(e => console.log(e));

      let q = "INSERT INTO pedidos VALUES (?, ?, ?, ?, ?, ? , ?,?,?, ?, ?, ? )";
      this.database.executeSql(q, [1, "pruebap","pruebad", "pruebae", "pruebaf", "pruebg", "pruebah", "pruebai",
      "pruebaj", "pruebak", "pruebal", "pruebam" ]);

      
        this.database.executeSql("SELECT * FROM items", []).then((data) => {
            
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.items.push(data.rows.item(i));
                }
            }
        }, (e) => {

            console.log("Errot: " + JSON.stringify(e));
        });
      console.log(this.items);*/

  //}

  /*seedDatabase() {
    this.http.get('assets/json/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          //this.loadDevelopers();
          //this.loadProducts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  addDeveloper() {
    let data = [1, "pruebap","pruebad", "pruebae", "pruebaf", "pruebg", "pruebah", "pruebai",
    "pruebaj", "pruebak", "pruebal", "pruebam" ];
    return this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ).then(data => {
      //this.loadDevelopers();
      console.log(data);
    });
  }

  consultar() {
    let query = 'SELECT pedidos.pid, pedidos.Pedido FROM pedidos';
    return this.database.executeSql(query, []).then(data => {
      let pedidos = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          pedidos.push({ 
            pid: data.rows.item(i).pid,
            Pedido: data.rows.item(i).Pedido
           });
        }
      }
      this.pedidosb.next(pedidos);
    });
  }
  

  createTable(){

  }*/

  