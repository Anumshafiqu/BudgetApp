import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
// masterService= inject(MasterService);
// fromDate:string = '';
// toDate:string = '';
// loggedUserid: number= 0;
// dashBoardData:any;
// ngOnInit(): void {
//   const loggedUser = sessionStorage.getItem('budgetUser');
//   if (loggedUser != null) {
//     this.loggedUserid = JSON.parse(loggedUser).userId;
//   }
// }
// getdashboardData(){
// this.masterService.getDashboardData(this.loggedUserid,this.fromDate,this.toDate).subscribe((Res:any)=>{
// this.dashBoardData = Res.data[0];
// })
// }






















fromDate: string = '';
toDate: string = '';
loggedUserid: number = 0;
dashBoardData: any = {};

ngOnInit(): void {
  // Retrieve logged user from sessionStorage
  const loggedUser = sessionStorage.getItem('budgetUser');
  if (loggedUser) {
    this.loggedUserid = JSON.parse(loggedUser).userId;
  }

  // Load data from localStorage if available
  const storedData = localStorage.getItem('dashboardData');
  if (storedData) {
    this.dashBoardData = JSON.parse(storedData);
  } else {
    // Set initial mock data if nothing exists in localStorage
    this.dashBoardData = {
      totalIncome: 0,
      totalExpense: 0,
      netIncome: 0,
    };
  }
}

getdashboardData() {
  if (!this.fromDate || !this.toDate) {
    alert('Please select both From Date and To Date.');
    return;
  }

  // Mock data to simulate API response
  const mockData = {
    totalIncome: 5000,
    totalExpense: 2000,
    netIncome: 3000,
  };

  // Store mock data in localStorage
  localStorage.setItem('dashboardData', JSON.stringify(mockData));

  // Retrieve the data and update the dashboard
  this.dashBoardData = mockData;
  alert('Data loaded and saved locally.');
}
clearLocalStorage() {
  localStorage.removeItem('dashboardData');
  this.dashBoardData = {
    totalIncome: 0,
    totalExpense: 0,
    netIncome: 0,
  };
  alert('Local storage cleared.');
}

}
