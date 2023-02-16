import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { JobFormComponent } from './job-form/job-form.component';


@NgModule({
  declarations: [
    IndexComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
