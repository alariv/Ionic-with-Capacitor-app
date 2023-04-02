import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'ar-launcher',
    loadChildren: () =>
      import('./ar-launcher/ar-launcher.module').then(
        (m) => m.ARLauncherPageModule
      ),
    },
     { 
    path: 'ar',
    loadChildren: () => import('./ar/ar.module').then( m => m.ARPageModule)
     }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}