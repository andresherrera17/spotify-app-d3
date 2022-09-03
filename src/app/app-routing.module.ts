import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'

const routes: Routes = [
  {
    path: 'home', canActivate:[AngularFireAuthGuard] , data: { authGuardPipe: redirectUnauthorizedTo }, loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth', canActivate:[AuthGuard] , loadChildren: () => import('./page/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '', pathMatch:'full', redirectTo:'auth/login'
  },
  {
    path: '**', pathMatch:'full', redirectTo:'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
