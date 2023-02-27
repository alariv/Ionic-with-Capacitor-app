import { Component, Input } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraPermissionType,
  CameraSource,
} from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { dummyImage } from './image.const';
@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;
  imageSource: string | SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${dummyImage}`
    );

  constructor(private sanitizer: DomSanitizer) {}

  getPermissions = async () => {
    return await Camera.checkPermissions();
  };
  permissionsState = async () => {
    return await this.getPermissions();
  };

  askPermission() {
    Camera.requestPermissions({
      permissions: ['camera'],
    });
    this.getPermissions();
  }
  refreshPermissions() {
    this.getPermissions();
  }
  takePhoto = async () => {
    const photoBase64 = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 10,
    });

    console.log('base64:', photoBase64);
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${photoBase64.base64String || dummyImage}`
    );
  };

  cameraPermission = JSON.stringify(this.permissionsState);
}
