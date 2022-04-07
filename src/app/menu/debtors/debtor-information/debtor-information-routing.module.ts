import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DebtorInformationPage } from './debtor-information.page';

const routes: Routes = [
  {
    path: '',
    component: DebtorInformationPage
  },
  {
    path: 'information',
    loadChildren: () => import('./information/information.module').then( m => m.InformationPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtorInformationPageRoutingModule {}
