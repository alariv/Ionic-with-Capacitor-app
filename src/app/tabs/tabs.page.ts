import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import { Tab3Page } from '../tab3/tab3.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private router: Router) {}
  activeTab = 1;


  ngOnInit() {
  }

  navigate(tab: number) {
    switch(tab) {
      case 1:
        this.router.navigateByUrl('/tabs/tab1');
        this.activeTab = 1;
        break;
      case 2:
        this.router.navigateByUrl('/tabs/tab2');
        this.activeTab = 2;
        break;
      case 3:
        this.router.navigateByUrl('/tabs/tab3');
        this.activeTab = 3;
        break;
      case 4:
        this.router.navigateByUrl('/tabs/tab4');
        this.activeTab = 4;
        break;
      case 5:
        this.router.navigateByUrl('/tabs/tab5');
        this.activeTab = 5;
        break;
    }
  }

  // async openAR() {
  //   const modal: HTMLIonModalElement = await this.modalController.create({
  //     component: Tab3Page,
  //     swipeToClose: true,
  //     // presentingElement: this.routerOutlet.nativeEl,
  //   });

  //   return await modal.present();
  // }
}
