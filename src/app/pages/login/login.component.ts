import { Component, inject } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // islogin: boolean = false;
  // register: any = {

  //   "userId": 0,
  //   "userName": "",
  //   "emailId": "",
  //   "fullName": "",
  //   "role": "",
  //   "createdDate": new Date(),
  //   "password": "",
  //   "projectName": "",
  //   "refreshToken": "",
  //   "refreshTokenExpiryTime": ""

  // }
  // constructor(private masterservice:MasterService){}
  // createUser(){
  //   debugger;
  //   this.masterservice.createobj(this.register).subscribe((res:any)=>{
  //     if(res.result){
  //       alert('user Created')
  //     }else {
  //       alert(res.message)
  //     }
  //   })
  // } 
  // loginuser(){
  //   debugger;
  //   this.masterservice.LoginUser(this.loginObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert('user Created')
  //     }else {
  //       alert(res.message)
  //     }
  //   })
  // } 
  // loginObj:any = {

  //     "userName": "string",
  //     "password": "string"

  // }



  isLogin: boolean = true;

  register: any = {
    userId: 0,
    userName: '',
    emailId: '',
    fullName: '',
    role: '',
    createdDate: new Date(),
    password: '',
  };

  loginObj: any = {
    userName: '',
    password: '',
  };

  constructor(private masterservice: MasterService, private router: Router) { }

  // Register User
  registerUser(): void {
    debugger;
    
    const newUser = { ...this.register, userId: Date.now() };
    this.masterservice.saveUser(newUser);
    alert('User Registered Successfully!');
    this.resetRegisterForm();
    this.router.navigateByUrl("home");
  }

  // Login User
  loginUser(): void {
    const isValid = this.masterservice.loginUser(
      this.loginObj.userName,
      this.loginObj.password
    );

    if (isValid) {
      alert('Login Successful!');
    } else {
      alert('Invalid Username or Password!');
    }
  }

  // Reset Registration Form
  resetRegisterForm(): void {
    this.register = {
      userId: 0,
      userName: '',
      emailId: '',
      fullName: '',
      role: '',
      createdDate: new Date(),
      password: '',
    };
  }
}
