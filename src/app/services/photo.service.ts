import { Injectable } from '@angular/core';


import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
  Filesystem
} from '@capacitor/core';

import { Photo } from '../pages/camara/model/photo.interface';
import { Platform } from '@ionic/angular';

const { Camera, FileSystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photos: Photo[] = [];

  private PHOTO_STORAGE = 'photos';
  private platform: Platform;

  constructor(platform: Platform) {

    this.platform = platform;

  }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 1,
    });
      
    window.localStorage.setItem( "photo", JSON.stringify(capturedPhoto));

    const saveImageFile = await this.savePicture(capturedPhoto);

    this.photos.unshift(saveImageFile);

    //Metodo que automaticamente guarda la imagen en el storage
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(
        this.photos.map((p) => {
          const photoCopy = { ...p };
          delete photoCopy.base64;
          return photoCopy
        })
      ),
    });
  }

  public async loadSaved() {
    const photos = await Storage.get({
      key: this.PHOTO_STORAGE,
    });

    this.photos = JSON.parse(photos.value) || [];
    if (!this.platform.is('hybrid')) {    
     /*const capturedBase64 = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });*/
      for (let photo of this.photos) {
        const readFile = await FileSystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data
        });
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public getPhotos(): Photo[] {
    return this.photos;
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    //convierte el fichero en base 64
    const base64Data = await this.readAsBase64(cameraPhoto);

    //el nombre de la imagen
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  // Metodos para convertir la imagen en base64
  public async readAsBase64(cameraPhoto: CameraPhoto) {


    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async getPhotoFile(cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> {
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    }
  }
}
