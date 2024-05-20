import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environment/environment';
import moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { StorageService } from '../_services/storage.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit{
  public companies: any[] = [];
  public searchText: string = '';
  public selectedCompany: any = null;
  public selectedCompanyOfficers: any = null;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private storageService: StorageService, private router: Router, private location: Location) {}

  ParseDate(date: string) {
    if (date.includes('\\')) {
      const s = date.split('\\')[0];

      const newDate = new Date(`${s[2]}-${s[1]}-${s[0]}`);
      return moment(newDate).format('D MMMM YYYY');
    }
    try {
      const newDate = new Date(date);
      return moment(newDate).format('D MMMM YYYY');
    } catch (e) {
      return undefined;
    }
  }

  selectListOfficers(company: any) {
    if (!company) {
      this.selectedCompanyOfficers = null;
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Api-Key': environment.apiKey,
      });
      this.httpClient
        .get(
          `https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Officers?CompanyNumber=${company.company_number}`,
          { headers }
        )
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.selectedCompanyOfficers = data.items as any[];
          },
          error: (error) => console.error(error),
        });
    }
  }

  ngOnInit() {
    
    if(this.storageService.isLoggedIn()) {
    this.fetchCompany();
    }
    else {
      
      this.router.navigate(['/login'], {queryParams: { returnUrl: encodeURIComponent(this.location.path()) }});
    }
  }

  fetchCompany() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': environment.apiKey,
    });
    this.route.queryParams.subscribe((params) => {
      const value = params['Query'];
      const param = `?Query=${value}`;

      this.httpClient
        .get(
          `https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Search${param}`,
          { headers }
        )
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.companies = data.items as any[];
            if(data.items.length > 0) {
              this.selectedCompany = data.items[0];
             // this.selectListOfficers(this.selectedCompany);
            }
          },
          error: (error) => console.error(error),
        });
    });
  }
}
