import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {Employe} from '../Models/Employe';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    private navigation: Router,
    private dataService: DataService
  ) { }

  empArray: Employe[];
  pageCounter = 1;
  pageSize = 10;
  numberOfListItems = 0;
  buttonsCounter: any = [];

  pagesCounter() {
    const lastPageItems = (this.numberOfListItems % this.pageSize);
    const buttonsCount = (this.numberOfListItems - (this.numberOfListItems % this.pageSize)) / this.pageSize;
    for (let i = 0; i < buttonsCount; i++) {
      this.buttonsCounter.push(i + 1);
    }
    if (lastPageItems !== 0) {
      this.buttonsCounter.push(buttonsCount + 1);
    }
  }
  ngOnInit() {
    this.dataService.getAllData(this.pageCounter).subscribe((data: any) => {
      this.empArray = data.employees;
      this.numberOfListItems = data.fullLengthInTable;
      this.pagesCounter();
    });
  }


  deleteEmp(emp: any, i: number) {
    console.log(emp);
    this.dataService.removeEmp(emp.empID).subscribe((data) => {
      this.empArray.splice(i, 1);
    });
  }

  editEmp(emp: any) {
    this.navigation.navigate(['edit'], {queryParams: emp});
  }

  viewEmp(emp: any) {
    this.navigation.navigate(['view'], {queryParams : emp});
  }

  redirectToAdd() {
    this.navigation.navigate(['add']);
  }

  searchData(event) {
    const searchText = event.target.value;
    if  (searchText !== '') {
      this.dataService.searchEmp(searchText).subscribe((data) => {
        this.empArray = data;
      });
    }
    if (searchText === '' ) {
      this.dataService.getAllData(this.pageCounter).subscribe((data: any) => {
        this.empArray = data.employees;
      });
    }
  }

  paginate(length: number) {
    this.pageCounter += length;
    if (this.pageCounter > this.buttonsCounter.length) {
      this.pageCounter = this.buttonsCounter.length;
    }
    if (this.pageCounter < 0 || this.pageCounter === 0 || length === 0) {
      this.pageCounter = 1;
    }
    console.log(this.pageCounter);
    this.dataService.getAllData(this.pageCounter).subscribe((data: any) => {
      this.empArray = data.employees;
    });
  }

  setpage(param: any) {
    this.pageCounter = param + 1;
    this.dataService.getAllData(this.pageCounter).subscribe((data: any) => {
      this.empArray = data.employees;
    });
  }
}
