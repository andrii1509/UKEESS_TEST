import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainPageComponent} from '../main-page/main-page.component';
import {EditPageComponent} from '../edit-page/edit-page.component';
import {AddPageComponent} from '../add-page/add-page.component';
import {RouterModule} from '@angular/router';
import {ViewPageComponent} from '../view-page/view-page.component';

const routes = [
  {path : '', component : MainPageComponent},
  {path : 'edit', component : EditPageComponent},
  {path : 'add', component : AddPageComponent},
  {path : 'view', component : ViewPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: []
})
export class RoutingModule { }
