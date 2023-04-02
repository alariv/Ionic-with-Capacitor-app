import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor() {}

  // async openAR() {
  //   const modal: HTMLIonModalElement = await this.modalController.create({
  //     component: Tab3Page,
  //     swipeToClose: true,
  //     // presentingElement: this.routerOutlet.nativeEl,
  //   });

  //   return await modal.present();
  // }
}
