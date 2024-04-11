import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './component/book/book.component';
import { BookingdetailsComponent } from './component/bookingdetails/bookingdetails.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { UpdateComponent } from './component/update/update.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path: 'book', component: BookComponent},
  {path: 'details', component:BookingdetailsComponent},
  {path : 'edit/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
