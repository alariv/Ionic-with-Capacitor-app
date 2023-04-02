import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ar-launcher',
  templateUrl: './ar-launcher.page.html',
  styleUrls: ['./ar-launcher.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ARLauncherPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.openAR();
  }

  async openAR() {
    const modal: HTMLIonModalElement = await this.modalCtrl.create({
      component: ARLauncherPage,
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl,
    });

    return await modal.present();
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
