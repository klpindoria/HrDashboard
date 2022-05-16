import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { ContactService } from 'src/app/services/contact.service';

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
    private router: Router
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
    alert('delete clicked' + contactId);

    this.contactService.deleteContact(contactId).subscribe((data) => {
      this.loadAllContacts();
    }, (error) => {
      this.errorMessage = error;
    })
  }

}
