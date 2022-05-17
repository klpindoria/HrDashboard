import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {


  public loading:boolean = false;
  public contacts:IContact[] = [];
  public errorMessage: string | null = null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadAllContacts();
  }

  public loadAllContacts() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data) => {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public deleteContact(contactId: string) {
    this.loading = true;
    this.contactService.deleteContact(contactId).subscribe((data) => {
      this.loadAllContacts();
      this.toasterService.show('Contact deleted successfully', {
        classname: 'bg-success text-light',
        delay: 5000,
        autohide: true,
        headertext: 'Success'
      })
    }, (error) => {
      this.loading = false;
      this.errorMessage = error;
      this.toasterService.show(`Problems deleting contact. Error: ${error}`, {
        classname: 'bg-danger text-light',
        autohide: false,
        headertext: 'Error'
      })
    })
  }

}
