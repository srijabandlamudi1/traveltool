import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { Bookings, User} from 'src/app/data.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  myForm! : FormGroup
  radiobtns2 =['Round Trip', 'One Way'];
  regimes = ['12','13','14'];
  pcount = false;
  fCity = '';
  minDate = new Date();
  toMinDate : any;
  tCity : any;
  fromPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  toPlaces = ['Hyderabad', 'Delhi', 'Bangalore', 'Mumbai', 'Goa', 'Chennai', 'Vijayawada', 'Vizag'];
  flightNames = ['Indigo', 'GoAir', 'Jet Airways', 'Air Asia', 'Spicejet', 'Vistara'];
  timings = ['6:00 AM', '7:00 AM', '8:00AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'
  ,'03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
  radiobtns = ['Yes', 'No'];
  hideTo = false;
  booking! : Bookings;
  constructor(private _fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      tripType : ['', Validators.required],
      fromPlace : ['', Validators.required],
      toPlace : ['', Validators.required],
      fromDate :['', Validators.required] ,
      toDate : '',
      count: ['', Validators.required],
      flight_name : ['', Validators.required],
      timing : ['', Validators.required],
      luggage : ['', Validators.required],
      passenger_name1 : ['', Validators.required],
      passenger_name2 : ''
    })
  }

  pCount(event:any){
    if(event.checked){
      this.myForm.controls['passenger_name2'].setValidators([Validators.required]);
    }
    else{
      this.myForm.controls['passenger_name2'].clearValidators();
      this.myForm.controls['passenger_name2'].updateValueAndValidity();
    }
  }

  tripType(event:any){
    console.log(event.value);
    if(event.value=== 'One Way'){
      this.hideTo = true;
      this.myForm.controls['toDate'].clearValidators();
      this.myForm.controls['toDate'].updateValueAndValidity();
    }
    else{
      this.hideTo = false;
      this.myForm.controls['toDate'].setValidators([Validators.required]);
    }
  }

  submit(){
    console.log(this.myForm.value);
    this.booking = this.myForm.value;
    this.booking.user_email = this.userService.getUserFromLocalStorage?.email;
    this.booking.status = 'BOOKED';
    if(this.myForm.value.tripType === 'One Way'){
      this.myForm.value.toDate = '';
    }
    //console.log(this.authService.currentUserValue);
    var fullData = Object.assign(this.myForm.value, this.booking);
    console.log(fullData);
    this.userService.submitNewBookingDetails(fullData).subscribe((data:any) => {
      alert('Success');
      this.router.navigate(['/home']);
    })
  }

}
