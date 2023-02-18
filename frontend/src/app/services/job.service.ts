import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Candidate } from '../shared/models/Candidate.model';
import { CandidateAdapter } from '../shared/adapters/candidate.adapter';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  rootURL = '/candidate';

  constructor(private http: HttpClient, private adapter: CandidateAdapter) { }

  addApplication(candidate: Candidate): Observable<any>{
    return this.http.post<Candidate>(this.rootURL+"/add", candidate);
  }

  saveUploadedResume(resume: any): Observable<any>{
    return this.http.post(this.rootURL+"/resume", resume);
  }

  getAllApplications(): Observable<Candidate[]>{
    //return this.http.get(this.rootURL);
    return this.http.get(this.rootURL).pipe(
      // Adapt each item in the raw data array
      map((resp: any) => resp.map((item: any) => this.adapter.adapt(item)))
    );
  }

}
