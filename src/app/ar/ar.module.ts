import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ARPage } from './ar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ARPageRoutingModule } from './ar-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ARPageRoutingModule
  ],
  declarations: [ARPage]
})
export class ARPageModule {}
