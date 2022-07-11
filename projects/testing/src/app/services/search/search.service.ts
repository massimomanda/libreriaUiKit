import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('token');

  startSearch(query: any) {
    // const headers = { Authorization: this.token };
    return this.http.get(
      `https://api.spotify.com/v1/search?type=album&include_external=audio&q=${query}`, {
        headers: {
            Authorization: 'Bearer ' + ' ' + this.token
        }
      }
    );
  }
}
