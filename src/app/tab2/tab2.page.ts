import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { dummyImage } from './image.const';
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

  constructor(private sanitizer: DomSanitizer) {}

  takePhoto = async () => {
    const photoBase64 = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      // quality: 10,
    });

    console.log('base64:', photoBase64);
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${photoBase64.base64String || dummyImage}`
    );
  };
}
