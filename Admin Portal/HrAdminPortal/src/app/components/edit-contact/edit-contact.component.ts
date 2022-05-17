import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading: boolean = false;
  public contactId: string | null = null;
  public errorMessage: string | null = null;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router,
    private toasterService: ToastService
  ) { }

  ngOnInit(): void {

    this.loading = true;
    //Get Id from URL
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    })

    //Get Contact Object using from ContactService/DB
    if (this.contactId) {
      this.contactService.getSingleContact(this.contactId).subscribe((data) => {
        this.contact = data;
        //get Group dropdown
        this.contactService.getAllGroups().subscribe((data) => {
          this.groups = data;
        }, (error) => {
          this.errorMessage = error;
          this.toasterService.show(`Problems Group details for this contact. Error:  ${error}`, {
            classname: 'bg-danger text-light',
            autohide: false,
            headertext: 'Error'
          })
        })
        this.loading = false;
      }, (error) => {
        this.errorMessage = error;
        this.toasterService.show(`Problems fetching details for this contact. Error:  ${error}`, {
          classname: 'bg-danger text-light',
          autohide: false,
          headertext: 'Error'
        })
      })
    }
  }

  public submitEdit() {
    if (this.contactId) {
      this.contactService.updateContact(this.contact, this.contactId).subscribe((data) => {
        this.router.navigate(['/']).then();
        this.toasterService.show('Contact updated successfully', {
          classname: 'bg-success text-light',
          delay: 5000,
          autohide: true,
          headertext: 'Success'
        })
      }, (error) => {
        this.errorMessage = error;
        this.toasterService.show(`Problems updating details for this contact. Error:  ${error}`, {
          classname: 'bg-danger text-light',
          delay: 10000,
          autohide: false,
          headertext: 'Error'
        })
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
      })
    }
  }

}
