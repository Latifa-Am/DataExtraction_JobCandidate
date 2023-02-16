import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.css']
})
export class JobFormComponent {
  angForm: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.angForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      description: ['']
    });
  }

  submitApplication(angForm1:any) {
    let firstName = angForm1.value.firstName;

    this.showSuccess();
    angForm1.reset();
  }

  get firstName() { return this.angForm.get('firstName'); }

  showSuccess() {
    this.toastr.success('Submission successful, thank you.');
  }

}
