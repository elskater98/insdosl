import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  map: Leaflet.Map | any;

  constructor() {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([41.608671,0.6294213], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
