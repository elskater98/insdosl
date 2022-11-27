import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';
import {IonModal} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {Geolocation} from "@ionic-native/geolocation/ngx";
import {GeoService} from "../services/geo.service";
import {PhotoService} from "../services/photo.service";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(private geo: Geolocation, private geoService: GeoService, private PhotoService: PhotoService) {
  }

  map: Leaflet.Map | any;
  @ViewChild(IonModal) modal: any;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";
  sensor_type: string = "Sensor";
  lat: number = 0;
  long: number = 0;

  isModalOpen = false;

  currentLocation() {
    this.geo.getCurrentPosition().then(r => {
      this.lat = r.coords.latitude
      this.long = r.coords.longitude
    }).catch(err => console.log(err))
  }

  currentPhoto() {
    const coords = {
      'latitude': this.lat,
      'longitude': this.long,
      'description': this.name
    };
    this.PhotoService.addNewToGallery(coords);
    this.setOpen(false);
  }

  resetFields() {
    this.name = "";
    this.sensor_type = "Sensor";
    this.currentLocation();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;

    if (!isOpen) {
      this.resetFields()
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.setOpen(false);
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.geoService.create({
      longitude: this.long, latitude: this.lat,
      description: this.name,
      photo: "",
      type: this.sensor_type
    }).subscribe((res) => {
      console.log(res)
    });
    let c = Leaflet.circle([this.lat, this.long], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 10
    }).addTo(this.map)
    c.bindPopup(this.name + " " + this.sensor_type).openPopup()
    this.setOpen(false)
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
    this.setOpen(false)
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.currentLocation()
    this.leafletMap();

    this.geoService.getCanalization().subscribe((res) => {
      res.map((i: any) => {
        let p = Leaflet.polyline(i.geom.coordinates, {color: 'green'}).addTo(this.map)
        p.bindPopup(i.description + " " + i.type)
      })
    })

    this.geoService.getPoints().subscribe((res) => {
      res.map((i: any) => {
        var photoImg = '<img src="' + i.photo + '" height="150px" width="150px"/>';
        let c = Leaflet.circle(i.geom.coordinates, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 10
        }).addTo(this.map)
        if (i.photo != "") {
          c.bindPopup(photoImg)
        } else {
          c.bindPopup(i.description +" "+ i.type)
        }
      })
    })

    this.map.on('dblclick', (event: any) => {
      this.setOpen(true);
      let latlng = event['latlng']
      this.lat = latlng['lat']
      this.long = latlng['lng']
    })
  }

  leafletMap() {
    this.map = Leaflet.map('mapId', {attributionControl: false}).setView([41.608671, 0.6294213], 6).setZoom(8);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
