import { Component, Input, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent implements OnInit{
  // @Input() masterId: number = 0;
  // CategoryList: any[] = [];
  // transctionObj: any = {
  //   "transactionId": 0,
  //   "userId": 0,
  //   "categoryId": 0,
  //   "amount": 0,
  //   "date": "2025-01-12T11:25:10.396Z",
  //   "purpose": "",
  //   "transactionTypeId": 0
  // }
  // constructor(private masterService: MasterService) {
  //   const loggedUser = sessionStorage.getItem('budgetUser');
  //   if (loggedUser != null) {
  //     this.transctionObj.userId = JSON.parse(loggedUser).userId;

  //   }

  // }
  // ngOnInit(): void {
  //   this.getCategoryByUser();
  // }
  // getCategoryByUser() {
  //   this.masterService.GetCategoryByUserId(this.transctionObj.userId).subscribe((res: any) => {
  //     this.CategoryList = res.data

  //   })
  // }
  // openmodel() {
  //   const model = document.getElementById('myModal')
  //   if (model != null) {
  //     model.style.display = 'block'
  //   }
  // }
  // closemodel() {
  //   const model = document.getElementById('myModal')
  //   if (model != null) {
  //     model.style.display = 'none'
  //   }
  // }







  @Input() masterId: number = 0;
  // CategoryList: any[] = [];
  transctionObj: any = {
    transactionId: 0,
    userId: 0,
    categoryId: 0,
    amount: 0,
    date: new Date().toISOString(),
    purpose: '',
    transactionTypeId: 0,
  };



 

  constructor(private masterService: MasterService) {
    const loggedUser = sessionStorage.getItem('budgetUser');
    if (loggedUser != null) {
      this.transctionObj.userId = JSON.parse(loggedUser).userId;
    }
  }

  // ngOnInit(): void {
  //   this.getCategoryByUser();
  // }

  // getCategoryByUser() {
  //   this.masterService.GetCategoryByUserId(this.transctionObj.userId).subscribe({
  //     next: (res: any) => {
  //       this.CategoryList = res.data;
  //       this.masterService.saveFallbackCategories(this.CategoryList);
  //     },
  //     error: (error: any) => {
  //       console.error('Error fetching categories', error);
  //       this.CategoryList = this.masterService.getFallbackCategories() || [];
  //     }
  //   });
  // }
 
  // transctionObj: any = {
  //   categoryId: '',
  //   categoryName: '',
  //   amount: 0,
  //   purpose: ''
  // };

  


  // Closes the modal
  closemodel() {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'none';
  }

  // Saves the data entered in the modal and adds it to the card list
  // saveData() {
  //   if (this.transctionObj.categoryId && this.transctionObj.amount && this.transctionObj.purpose) {

  //     const selectedCategory = this.CategoryList.find(
  //       (item) => item.categoryId === this.transctionObj.categoryId
  //     );
  //     this.CategoryList.push({
  //       categoryId: this.transctionObj.categoryId,
  //       categoryName: selectedCategory ? selectedCategory.categoryName : 'New Category',
  //       amount: this.transctionObj.amount,
  //       purpose: this.transctionObj.purpose
  //     });
  //     this.closemodel();
  //   } else {
  //     alert('Please fill in all fields before saving.');
  //   }
  // }

  CategoryList: Array<any> = [];




  // CategoryList: any[] = [];
  // transctionObj: any = {
  //   categoryId: '',
  //   categoryName: '',
  //   amount: 0,
  //   purpose: ''
  // };

  // constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getCategoryByUser();
  }

  getCategoryByUser() {
    this.masterService.GetCategoryByUserId(this.transctionObj.userId).subscribe({
      next: (res: any) => {
        this.CategoryList = res.data;
      },
      error: (err: any) => {
        console.error('Error fetching categories', err);
      }
    });
  }

  openmodel() {
    this.transctionObj = {
      categoryId: '',
      categoryName: '',
      amount: 0,
      purpose: ''
    };

    const modalElement = document.getElementById('myModal')!;
    const modal = new Modal(modalElement);
    modal.show();
  }

  // saveTransaction() {
  //   if (this.transctionObj.categoryId && this.transctionObj.amount && this.transctionObj.purpose) {
  //     const selectedCategory = this.CategoryList.find(
  //       (item) => item.categoryId === this.transctionObj.categoryId
  //     );

  //     this.CategoryList.push({
  //       categoryId: this.transctionObj.categoryId,
  //       categoryName: selectedCategory ? selectedCategory.categoryName : 'New Category',
  //       amount: this.transctionObj.amount,
  //       purpose: this.transctionObj.purpose
  //     });

  //     const modalElement = document.getElementById('myModal')!;
  //     const modal = Modal.getInstance(modalElement);
  //     modal!.hide();
  //   } else {
  //     alert('Please fill in all fields before saving.');
  //   }
  // }

  saveTransaction() {
    if (this.transctionObj.amount && this.transctionObj.purpose) {
      const selectedCategory = this.CategoryList.find(
        (item) => item.categoryId === this.transctionObj.categoryId
      );
  
      this.CategoryList.push({
        categoryId: this.transctionObj.categoryId || 'new',
        categoryName: selectedCategory ? selectedCategory.categoryName : 'New Category',
        amount: this.transctionObj.amount,
        purpose: this.transctionObj.purpose,
      });
  
      const modalElement = document.getElementById('myModal')!;
      const modal = Modal.getInstance(modalElement);
      modal!.hide();
      alert('Transaction saved successfully!');
    } else {
      alert('Please fill in all required fields before saving.');
    }
  }
  
  editTransaction(item: any) {
    // Populate the transaction object with selected transaction details
    this.transctionObj = { ...item };

    // Open the modal
    const modalElement = document.getElementById('transactionModal')!;
    const modal = new Modal(modalElement);
    modal.show();
  }
  deleteTransaction(categoryId: string) {
    this.CategoryList = this.CategoryList.filter((item) => item.categoryId !== categoryId);
  }
}
