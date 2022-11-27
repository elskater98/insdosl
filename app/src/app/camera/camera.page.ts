import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotoService} from '../services/photo.service';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {GeoService} from "../services/geo.service";

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage implements OnInit, OnDestroy {

  ngOnInit() {
  }

  constructor(public photoService: PhotoService, private geolocation: Geolocation, private geoService: GeoService) {
  }

  addPhotoToGallery() {
    this.geolocation.getCurrentPosition().then((res) => {
      const coords = {
        longitude: res.coords.longitude,
        latitude: res.coords.latitude
      };
      this.photoService.addNewToGallery(coords);
    }).catch(err => console.log(err.toString()))
  }

  ngOnDestroy(): void {
  }
}
