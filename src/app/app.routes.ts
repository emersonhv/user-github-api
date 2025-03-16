import { Routes } from '@angular/router';
import { UserDetailComponent } from '@components/user-detail/user-detail.component';
import { HomeComponent } from '@components/home/home.component';
//import { ScoreGuard } from './guards/score.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user/:username', component: UserDetailComponent },
    //, canActivate: [ScoreGuard] Score Guard Desactivado porque hay todos los usaurios consultado tienen score = 1.0
];
