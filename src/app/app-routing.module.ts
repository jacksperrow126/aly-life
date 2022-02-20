import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./view/pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./view/pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'note',
    loadChildren: () =>
      import('./view/pages/note/note.module').then((m) => m.NotePageModule),
  },
  {
    path: 'money',
    loadChildren: () =>
      import('./view/pages/money/money.module').then((m) => m.MoneyPageModule),
  },
  {
    path: 'health',
    loadChildren: () =>
      import('./view/pages/health/health.module').then(
        (m) => m.HealthPageModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./view/pages/setting/setting.module').then(
        (m) => m.SettingPageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./view/pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./view/pages/about/about.module').then((m) => m.AboutPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
