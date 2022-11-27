import {Component, OnDestroy, OnInit} from '@angular/core';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.page.html',
  styleUrls: ['camera.page.scss']
})
export class CameraPage implements OnInit, OnDestroy {

  ngOnInit() {
  }
  
  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ngOnDestroy(): void {
    
  }
 
}
