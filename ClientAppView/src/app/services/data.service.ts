import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestMethod, RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  AllEmp = 'http://localhost:3000/getAllEmp/';
  AllDpt = 'http://localhost:3000/getAllDpt/';
  addEmp = 'http://localhost:3000/addEmp/';
  deleteEl = 'http://localhost:3000/deleteEmp/';
  updateEmp = 'http://localhost:3000/updateEmp/';
  search = 'http://localhost:3000/searchEmp/';
  constructor(
    private http: HttpClient
  ) { }
  getAllData(pageNum): Observable<any[]> {
    return this.http.get<any>(this.AllEmp + pageNum);
  }
  getAllDpt(): Observable<any> {
    return this.http.get(this.AllDpt);
  }
  addEmpToDB(emp): Observable<any> {
    return this.http.post<any>(this.addEmp, emp);
  }
  removeEmp(id): Observable<void> {
    return this.http.delete<void>(this.deleteEl + id);
  }
  changeEmp(data): Observable<any> {
    return this.http.put<any>(this.updateEmp, data);
  }
  searchEmp(name): Observable<any> {
    return this.http.get<any>(this.search + name);
  }
}
