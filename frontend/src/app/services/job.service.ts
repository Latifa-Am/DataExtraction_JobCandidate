import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '../models/Candidate.model';
import { map, Observable } from 'rxjs';
import { CandidateAdapter } from '../adapters/candidate.adapter';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  rootURL = '/candidate';

  constructor(private http: HttpClient, private adapter: CandidateAdapter) { }

  getAllApplications(): Observable<Candidate[]>{
    //return this.http.get(this.rootURL);
    return this.http.get(this.rootURL).pipe(
      // Adapt each item in the raw data array
      map((resp: any) => resp.map((item: any) => this.adapter.adapt(item)))
    );
  }

  addApplication(candidate: Candidate): Observable<any>{
    return this.http.post<Candidate>(this.rootURL+"/add", candidate);
  }

  
}
