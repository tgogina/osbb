import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MainComponent} from './components/main/main.component';
import {NewsComponent} from './components/news/news.component';
import {AdvertisementComponent} from './components/advertisement/advertisement.component';
import {DocumentsComponent} from './components/documents/documents.component';
import {LoginComponent} from './components/login/login.component';
import {DiscussionComponent} from './components/discussion/discussion.component';
import {HttpClientModule} from '@angular/common/http';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    AdvertisementComponent,
    DocumentsComponent,
    LoginComponent,
    DiscussionComponent,
    PhoneInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
