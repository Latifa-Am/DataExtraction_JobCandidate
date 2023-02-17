import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { CandidateAdapter } from 'src/app/adapters/candidate.adapter';
import { Candidate } from 'src/app/models/Candidate.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnDestroy {
  angForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  candidates: Candidate[] = [];

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
      this.showSuccess();
      this.angForm.reset();
    });
  }

  getAllApplications() {
    this.jobService.getAllApplications().pipe(takeUntil(this.destroy$)).subscribe((candidates: Candidate[]) => {
        this.candidates = candidates;
    });
  }

  showSuccess() {
    this.toastr.success('Submission successful, thank you.');
  }

}
