import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { HttpClient,  HttpHeaders, HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";
import { HomeComponent } from './home/home.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingDetailComponent } from './listing-detail/listing-detail.component';
import { MeComponent } from './me/me.component';
import { MyListingsComponent } from './my-listings/my-listings.component';


// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("413180638529-sc7rlm1qp517tfm2im6630h64t433h0h.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserRegistrationComponent,
    ListingsComponent,
    ListingDetailComponent,
    MeComponent,
    MyListingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SocialLoginModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
    cookieName: 'csrftoken',
    headerName: 'X-CSRFToken',
})

  ],
  providers: [
    {
     provide: AuthServiceConfig,
     useFactory: getAuthServiceConfigs
   },
   {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
