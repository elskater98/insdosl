import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as Leaflet from 'leaflet';
import {IonModal} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {Geolocation} from "@ionic-native/geolocation/ngx";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(public geo: Geolocation) {
  }

  map: Leaflet.Map | any;
  @ViewChild(IonModal) modal: any;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";
  lat: number = 0;
  long: number = 0;

  isModalOpen = false;

  currentLocation() {
    this.geo.getCurrentPosition().then(r => {
      console.log(r)
      this.lat = r.coords.latitude
      this.long = r.coords.longitude
    }).catch(err => console.log(err))
  }

  resetFields() {
    this.name = "";
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

    // TODO: GET DATA FROM API
    const data = [
      {
        "id": "xxxx-d5e8-2620d32a-003a1b97-7d2bb7c4",
        "geom": [[-0.1699227, 51.2323931], [-0.169954, 51.23241], [-0.170044, 51.232411]],
        "element_type": "canalization",
        "description": "NEW DUCT"
      }
    ]

    data.map((i: any) => {
      Leaflet.polyline(i.geom, {color: 'red'}).addTo(this.map);
    })

    this.map.on('dblclick', (event: any) => {
      this.setOpen(true);
      let latlng = event['latlng']
      this.lat = latlng['lat']
      this.long = latlng['lng']
    })
  }

  leafletMap() {
    this.map = Leaflet.map('mapId', {attributionControl: false}).setView([41.608671, 0.6294213], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
