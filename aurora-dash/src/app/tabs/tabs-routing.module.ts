import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../status/status.module').then(m => m.StatusPageModule)
          }
        ]
      },
      {
        path: 'historico',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../historico/historico.module').then(m => m.HistoricoPageModule)
          }
        ]
      },
      {
        path: 'configs',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../configs/configs.module').then(m => m.ConfigsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/status',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/status',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
