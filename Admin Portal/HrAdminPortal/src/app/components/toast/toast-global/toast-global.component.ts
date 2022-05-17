import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
    selector: 'toast-global',
    templateUrl: './toast-global.component.html',
    styleUrls: ['./toast-global.component.css']
  })

export class ToastGlobalComponent implements OnDestroy {
    constructor(public toastService: ToastService) {}

  showStandard() {
    this.toastService.show('I am a Standard message', {
      delay: 5000,
      autohide: true
    });
  }
  
  showSuccess() {
    this.toastService.show('I am a Success message', {
      classname: 'bg-success text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Success'
    });
  }

  showError() {
    this.toastService.show('I am an error message', {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Error'
    });
  }

  showCustom(customTpl: string | TemplateRef<any>) {
    this.toastService.show(customTpl, {
      classname: 'bg-info text-light',
      delay: 10000,
      autohide: true,
      headertext: 'Custom Header'
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}