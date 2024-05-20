import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './_services/permission.service';
const routes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'company',  canActivate: [AuthGuard], component: CompanyComponent},
  { path: 'login', component: LoginComponent},
   { path: '', component: SearchComponent , pathMatch: 'full'} ,
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
