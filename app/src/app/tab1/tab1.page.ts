import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Leaflet from 'leaflet';
import {LatLng, latLng, LatLngExpression} from "leaflet";
import {logoHackernews, options} from "ionicons/icons";

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

    this.map.on('dblclick',()=>{
      console.log("tetona")
    })


  }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([41.608671, 0.6294213], 6);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

}
