import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContactManagerComponent,
    ViewContactComponent,
    EditContactComponent,
    SpinnerComponent,
    AddContactComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
