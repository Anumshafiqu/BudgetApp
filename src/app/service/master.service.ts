import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
//  apiURL:string='https://projectapi.gerasim.in/api/BudgetPlanner/';
   constructor(private http:HttpClient){}
//   createobj(obj:any){
//     return this.http.post(`${this.apiURL}AddNewUser` , obj);
//   }
//   LoginUser(obj:any){
//     return this.http.post(`${this.apiURL}login` , obj);
//   }
getAllTransactionType(){
return this.http.get('https://projectapi.gerasim.in/api/BudgetPlanner/GetAllTransactionType')
}
// GetCategoryByUserId(id:number){
//   return this.http.get('https://projectapi.gerasim.in/api/BudgetPlanner/GetCategoryByUserId?userId=${id}')
// }

// private readonly STORAGE_KEY = 'users';

// Save user data to localStorage
saveUser(user: any): void {
  const existingUsers = this.getUsers();
  existingUsers.push(user);
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingUsers));
}

// Get all users from localStorage
getUsers(): any[] {
  const users = localStorage.getItem(this.STORAGE_KEY);
  return users ? JSON.parse(users) : [];
}

// Check if user exists (for login)
loginUser(username: string, password: string): boolean {
  const users = this.getUsers();
  return users.some(
    (user) => user.userName === username && user.password === password
  );
}

















private readonly STORAGE_KEY = 'fallbackCategories'; // LocalStorage key



GetCategoryByUserId(id: number) {
  const apiUrl = `https://projectapi.gerasim.in/api/BudgetPlanner/GetCategoryByUserId?userId=${id}`;

  return this.http.get(apiUrl).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error fetching data from API', error);

      // Check if data exists in localStorage as a fallback
      const fallbackData = this.getFallbackCategories();
      if (fallbackData) {
        console.warn('Using fallback data from localStorage');
        return throwError(fallbackData);
      }

      return throwError(error);
    })
  );
}

// Save fallback data to localStorage
saveFallbackCategories(categories: any[]): void {
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories));
}

// Get fallback data from localStorage
getFallbackCategories(): any[] | null {
  const data = localStorage.getItem(this.STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

}
