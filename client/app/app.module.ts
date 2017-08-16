import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent, FormApiComponent, ViewApiComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, FormApiService } from './_services/index';
import { HomeComponent } from './home/index';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ContentEditComponent } from './content/index';
import { ContentListComponent } from './content/index';
import { ContentComponent } from './content/index';
import { ContentService } from './content/content.service';
import { CurrentUserComponent } from './_directives/currentUser.component';
import { FileComponent } from './_directives/file.component';
import { FileService } from './_services/file.service';
import { ProfileComponent } from './profile/index';
import { dropdownDirective } from './_directives/dropdown.directive';
import { ChartDirective } from './_directives/chart.directive';
import { ChartService } from './_services/chart.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ContentEditComponent,
        ContentListComponent,
        ContentComponent,
        CurrentUserComponent,
        ProfileComponent,
        FileComponent,
        FormApiComponent,
        ViewApiComponent,
        dropdownDirective,
        UsersComponent,
        ChartDirective,
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        ContentService,
        FileService,
        FormApiService,
        ChartService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }