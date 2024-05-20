import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environment/environment';
import moment from 'moment';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public companies: any[] = [];
  public searchText: string = '';
  public searchError: string = '';
  constructor(private httpClient: HttpClient) {}

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

  fetchCompanies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': environment.apiKey,
    });
    const param = this.searchText ? `?Query=${this.searchText}` : '';
    this.httpClient
      .get(
        `https://angular-exercise.trunarrative.cloud/TruProxyAPI/rest/Companies/v1/Search${param}`,
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.items) {
            this.companies = data.items as any[];
            this.searchError = '';
          } else this.searchError = '0 companies found';
        },
        error: (error) => console.error(error),
      });
  }
}
