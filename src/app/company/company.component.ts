import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import axios from 'axios';
import moment from 'moment';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent {
  public companies: any[] = [];
  public searchText: string = '';
  public selectedCompany: any = null;
  public selectedCompanyOfficers: any = null;
  constructor(private httpClient: HttpClient) {}

  ParseDate(date: string) {
    if(date.includes('\\'))
      {
        const s = date.split('\\')[0];

        const newDate=  new Date(`${s[2]}-${s[1]}-${s[0]}`);
        return moment(newDate).format('D MMMM YYYY');
      }
    try
    {
     const newDate =  new Date(date);
      return moment(newDate).format('D MMMM YYYY');
    }
    catch(e)
    {
      return undefined;
    }
  }

  selectCompany(company: any){
    this.selectedCompany = company;
  }

  selectListOfficers(company: any){
    

    const headers = new HttpHeaders({'Content-Type': 'application/json',
    'X-Api-Key':environment.apiKey});
    this.httpClient.get(`https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber=${company.company_number}`,{headers}).subscribe({
      next: (data : any) => {
        console.log(data);
        this.selectedCompanyOfficers = data.items as any[];
      },
      error: (error) => console.error(error),
    });
    
  }

  fetchPosts() {
   
    const headers = new HttpHeaders({'Content-Type': 'application/json',
    'X-Api-Key':environment.apiKey});
    const param = this.searchText ? `?Query=${this.searchText}` : '';
    this.httpClient.get(`https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Search${param}`,{headers}).subscribe({
      next: (data : any) => {
        console.log(data);
        this.companies = data.items as any[];
      },
      error: (error) => console.error(error),
    });
  }
}
