import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';import { User } from '../data.model';
;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  base = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  submitNewBookingDetails(body:any){
    return this.http.post(this.base+'/postNewBooking', body);
  }
  
  getBookingDetails(){
    return this.http.get(this.base+'/getBookingDetails/'+this.getUserFromLocalStorage?.email);
  }

  getBookingDetailsById(id : any){
    return this.http.get(this.base+'/getBookingById/'+id, {withCredentials:true});
  }
  updateBookingDetails(data : any, id : any){
    const body = data;
    return this.http.put(this.base+'/updateBooking/'+id, body , {withCredentials:true});
  }
  deleteBookingDetails(id : any){
    return this.http.delete(this.base+'/deleteBooking/'+id, {withCredentials: true});
  }

  signIn(body:any){
    return this.http.post(this.base+'/getUser', body).pipe(map(user =>{
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(localStorage);
      return user;
    }));
  }

  getUserDetailsByEmail(email:any){
    return this.http.get(this.base+'/getUserById/'+email);
  }
  public get getUserFromLocalStorage(): User {
    var user =JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user[0];
  }

  deleteUserFromLocalStorage(){
    localStorage.removeItem('currentUser');
    return "Success";
  }
  postUser(data:any): Observable<any>{
    const body = {
      uName : data.uName,
      pwd : data.pwd,
      email : data.email,
      token : '',
      update_dt : new Date()
    }
    return this.http.post(this.base+'/postNewUser', body).pipe(map(user =>{
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(localStorage);
      return user;
    }));
  }
}
