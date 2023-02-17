import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent implements OnDestroy {
  angForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private jobService: JobService
  ) {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      description: [''],
      resume: ['']
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  submitApplication() {
    this.jobService.addApplication(this.angForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      console.log(this.angForm.value);
      this.showSuccess();
      this.angForm.reset();
    });
  }

  showSuccess() {
    this.toastr.success('Submission successful, thank you.');
  }

}
