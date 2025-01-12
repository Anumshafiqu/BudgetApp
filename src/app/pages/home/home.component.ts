import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
SelectedTab:string = 'Dashboard';
IncomeMasterId:number = 0 ;
ExpenseMasterId:number = 0;
masterservice = inject(MasterService);
transctionList:any[] = [];
changeTab(Tab:string){
  this.SelectedTab= Tab
}
ngOnInit(): void {
  this.getTransactionType();
}
getTransactionType(){
this.masterservice.getAllTransactionType().subscribe((res:any)=>{
  this.getTransactionType= res.data;
  const income = this.transctionList.find(m=>m.masterName == 'Income');
  if(income){
    this.IncomeMasterId = income.masterId;
  }
  const expense = this.transctionList.find(m=>m.masterName == 'Expense');
  if(expense){
    this.ExpenseMasterId = expense.masterId;
  }
})
}
}
