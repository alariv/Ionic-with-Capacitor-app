import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { dummyImage } from './image.const';
import { Storage } from '@ionic/storage-angular';

import {
  Camera,
  CameraResultType,
  CameraPermissionType,
  CameraSource,
} from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  imageSource: string | SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${dummyImage}`
    );

  images: string[]  = [];
  imageCache : string[] = [];
  public timenow:number = new Date().getHours();

  constructor(private sanitizer: DomSanitizer, private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const photos = await this.storage.get('photoCache');
    if (photos) {
      this.imageCache = JSON.parse(photos);
      for (const photo of this.imageCache) {
        this.images.push(<string>this.sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64, ${photo}`
        ));
      }
    }
  }

  takePhoto = async () => {
    const result = await Camera.requestPermissions();
    if (result.camera && result.photos) {
      // Has camera access
      const photoBase64 = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        // quality: 10,
      });

      console.log('base64:', photoBase64);
      this.images.push(<string>this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${photoBase64.base64String}`
      ));
      if (photoBase64.base64String != null) {
        this.imageCache.push(photoBase64.base64String);
      }
      this.onPhotosUpdated();
    } else {
      console.error('No access to camera');
    }
  };

  onPhotosUpdated() {
    this.storage.set('photoCache', JSON.stringify(this.imageCache));
  }




  
}
