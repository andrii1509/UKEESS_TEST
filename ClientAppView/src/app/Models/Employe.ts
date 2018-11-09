export class Employe {
  empID: number;
  empName: string;
  empActive: boolean;
  dpName: string;
  constructor(
    id: number,
    name: string,
    active: boolean,
    department: string
  ) {
    this.empID = id;
    this.empActive = active;
    this.dpName = department;
    this.empName = name;

  }
}
