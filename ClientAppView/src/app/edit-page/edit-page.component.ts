import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Employe} from '../Models/Employe';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  @ViewChild('select') select: ElementRef;
  currentEmp: any;
  dptArray: any[];
  constructor(
    private navigate: Router,
    private service: DataService,
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentRoute.queryParams.subscribe((data) => {
      this.currentEmp = data;

    });
    this.service.getAllDpt().subscribe((data) => {
      this.dptArray = data;
    });
  }

  sendForm(form: HTMLFormElement) {
    const newEmp = form.value;
    newEmp.empID = this.currentEmp.empID;
    newEmp.emp_dpID = this.select.nativeElement.value;
    this.service.changeEmp(newEmp).subscribe((res) => {
      console.log(res);
      this.navigate.navigate(['']);
    });
  }

  cancelEdit() {
    this.navigate.navigate(['']);
  }
}
