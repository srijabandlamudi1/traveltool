import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.scss']
})
export class BookingdetailsComponent implements OnInit {
  displayedColumns: string[] = ['_id','flight_name','tripType', 'fromDate', 'fromPlace', 'timing', 'status'];
  dataSource:any;
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.getBookingDetails().subscribe((data:any)=>{
      console.log(data);
      this.dataSource = data;
    })
  }

}
