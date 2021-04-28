import { AlertController } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { ProveedorDatosService } from './services/proveedor-datos.service'
import { HttpClientModule } from '@angular/common/http'
import { AlistardatosPage } from './pages/alistardatos/alistardatos.page'
import { RevisarEstadoModule } from './pages/revisar-estado/revisar-estado.module'

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    AlertController,
    AlistardatosPage,
    StatusBar,
    Geolocation,
    SplashScreen,
    RevisarEstadoModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProveedorDatosService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
