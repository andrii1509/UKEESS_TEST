import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Employe} from '../Models/Employe';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {

  constructor(
    private currentRoute: ActivatedRoute
  ) { }
  currentEmp: any;
  ngOnInit() {
    this.currentRoute.queryParams.subscribe((data) => {
      this.currentEmp = data;
      console.log(data);
    });
  }

}
