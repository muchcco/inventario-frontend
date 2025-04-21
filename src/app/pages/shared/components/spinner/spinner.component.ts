import { Component, Input } from '@angular/core';
import { LoadingService } from '../../../../services/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  show = false;

  constructor(private loadingService: LoadingService) { 
    this.loadingService.loading$.subscribe(status => {
      this.show = status;
    });
  }

}
