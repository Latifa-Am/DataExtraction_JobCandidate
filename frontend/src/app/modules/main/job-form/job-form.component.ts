import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { CandidateAdapter } from 'src/app/shared/adapters/candidate.adapter';
import { JobService } from 'src/app/services/job.service';
//import { Candidate } from 'src/app/models/Candidate.model';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})

export class JobFormComponent implements OnDestroy {
  angForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  //candidates: Candidate[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobService: JobService,
    private adapter: CandidateAdapter
  ) {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      description: [''],
      resume: ['']
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  //Save a new Job Application
  submitApplication() {
    let candidate = [
      {
        "firstName":  this.angForm.value.firstName,
        "lastName": this.angForm.value.lastName,
        "email": this.angForm.value.email,
        "description": this.angForm.value.description
    }
    ].map((item: any) => this.adapter.adapt(item));
    this.jobService.addApplication(candidate[0]).pipe(takeUntil(this.destroy$)).subscribe(message => {
      console.log(message);
      console.log(JSON.stringify(candidate[0], null, 2));
      this.showSuccess();
      this.angForm.reset();
    });
  }

  showSuccess() {
      this.toastr.success('Submission successful, thank you.');
  }

  //Get all submissions
  /*getAllApplications() {
    this.jobService.getAllApplications().pipe(takeUntil(this.destroy$)).subscribe((candidates: Candidate[]) => {
        this.candidates = candidates;
    });
  }*/

}
