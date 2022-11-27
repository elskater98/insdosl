import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Directory, Filesystem } from '@capacitor/filesystem';
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private url = environment.urlConf;

  private coords = {
    latitude: 0,
    longitude: 0
  };

  constructor(public http: HttpClient) { }

  public async addNewToGallery(coords: any) {
    this.coords = coords;
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100 // highest quality (0 to 100)
    });

    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
  }
  
  private async savePicture(cameraPhoto: Photo) {
    return await this.readAsBase64(cameraPhoto);
  }

  private async readAsBase64(photo: Photo) {
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const final = await this.convertBlobToBase64(blob);
    this.sendPostRequest(final);
    console.log(final);
  }

  private sendPostRequest(blob: any) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Accept-Charset': 'utf-8'
        })
      };

    let postData = {
      "latitude": this.coords.latitude,
      "longitude": this.coords.longitude,
      "photo": blob
    }

    this.http.post(this.url+"/rd008", postData, httpOptions)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
