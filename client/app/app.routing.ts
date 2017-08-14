import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ContentComponent } from './content/index';
import { ContentEditComponent } from './content/index';
import { ContentListComponent } from './content/index';
import { AuthGuard } from './_guards/index';
import { ProfileComponent } from './profile/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'content/list', component: ContentListComponent },
    { path: 'content/add', component: ContentEditComponent },
    { path: 'content/edit/:id', component: ContentEditComponent },
    { path: 'content/:id', component: ContentComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'users', component: UsersComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);