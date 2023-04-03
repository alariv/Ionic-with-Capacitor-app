import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-ar',
  templateUrl: 'ar.page.html',
  styleUrls: ['ar.page.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class ARPage implements OnInit {


  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
