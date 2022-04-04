import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuard } from './@core/guards/auth.guard';
import {RegistrationComponent} from './modules/registration/registration.component';
import {ChangePasswordFinishComponent} from './modules/change-password-finish/change-password-finish.component';
import {ChangePasswordInitComponent} from './modules/change-password-init/change-password-init.component';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: 'changePassword/init',
    component: ChangePasswordInitComponent,
  },
  {
    path: 'changePassword/finish',
    component: ChangePasswordFinishComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
