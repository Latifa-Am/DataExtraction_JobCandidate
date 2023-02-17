import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  rootURL = '/candidate';

  constructor(private http: HttpClient) { }

  getAllApplications() {
    return this.http.get(this.rootURL);
  }

  addApplication(application: any) {
    return this.http.post(this.rootURL, {application});
  }
}
