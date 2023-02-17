import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  isHidden = true;

  showForm() {
    this.isHidden = !this.isHidden;
  }
}
