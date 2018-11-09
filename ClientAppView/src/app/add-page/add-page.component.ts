import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {
  @ViewChild('select') select: ElementRef;
  dptArray: any[];
  constructor(
    private navigation: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.getAllDpt().subscribe((data ) => {
      this.dptArray = data;
    });
  }

  sendNewDataForm(form: HTMLFormElement) {
    const newEmp = form.value;
    newEmp.emp_dpID = this.select.nativeElement.value;
    this.dataService.addEmpToDB(newEmp).subscribe((res) => {
      console.log(res);
      this.navigation.navigate(['']);
    });
  }

  cancelAdd() {
    this.navigation.navigate(['']);
  }
}
