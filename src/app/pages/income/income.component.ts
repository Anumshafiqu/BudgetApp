import { Component, Input, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';

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
  // transctionObj: any = {
  //   transactionId: 0,
  //   userId: 0,
  //   categoryId: 0,
  //   amount: 0,
  //   date: new Date().toISOString(),
  //   purpose: '',
  //   transactionTypeId: 0,
  // };



 

  constructor(private masterService: MasterService) {
    const loggedUser = sessionStorage.getItem('budgetUser');
    if (loggedUser != null) {
      this.transctionObj.userId = JSON.parse(loggedUser).userId;
    }
  }

  ngOnInit(): void {
    this.getCategoryByUser();
  }

  getCategoryByUser() {
    this.masterService.GetCategoryByUserId(this.transctionObj.userId).subscribe({
      next: (res: any) => {
        this.CategoryList = res.data;

        // Save to localStorage as fallback
        this.masterService.saveFallbackCategories(this.CategoryList);
      },
      error: (error: any) => {
        console.error('Error fetching categories', error);

        // Use fallback data
        this.CategoryList = this.masterService.getFallbackCategories() || [];
      }
    });
  }
  CategoryList: any[] = []; // List of cards displayed
  transctionObj: any = {
    categoryId: '',
    categoryName: '',
    amount: 0,
    purpose: ''
  };

  

  // Opens the modal
  openmodel() {
    // Reset the transaction object when opening the modal
    this.transctionObj = {
      categoryId: '',
      categoryName: '',
      amount: 0,
      purpose: ''
    };

    // Open the modal programmatically
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'block';
  }

  // Closes the modal
  closemodel() {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'none';
  }

  // Saves the data entered in the modal and adds it to the card list
  saveData() {
    if (this.transctionObj.categoryId && this.transctionObj.amount && this.transctionObj.purpose) {
      // Find the category name based on the categoryId
      const selectedCategory = this.CategoryList.find(
        (item) => item.categoryId === this.transctionObj.categoryId
      );

      // Add new card data
      this.CategoryList.push({
        categoryId: this.transctionObj.categoryId,
        categoryName: selectedCategory ? selectedCategory.categoryName : 'New Category',
        amount: this.transctionObj.amount,
        purpose: this.transctionObj.purpose
      });

      // Close the modal after saving
      this.closemodel();
    } else {
      alert('Please fill in all fields before saving.');
    }
  }
}
