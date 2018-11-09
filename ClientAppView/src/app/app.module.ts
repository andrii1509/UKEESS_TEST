import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AddPageComponent } from './add-page/add-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {RoutingModule} from './router/routing.module';
import {RouterModule} from '@angular/router';
import { ViewPageComponent } from './view-page/view-page.component';
// import {PagerService} from './services/page.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditPageComponent,
    AddPageComponent,
    ViewPageComponent,
  ],
  imports: [
    // PagerService,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
