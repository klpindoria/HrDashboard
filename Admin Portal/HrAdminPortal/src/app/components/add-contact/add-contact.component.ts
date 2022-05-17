import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact/contact.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading: boolean = false;
  public contact: IContact = {} as IContact;
  public groups: IGroup[] = [];
  public errorMessage: string | null = null;

  constructor(
    private contactService: ContactService, 
    private router: Router,
    private toasterService: ToastService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.contactService.getAllGroups().subscribe((data) => {
      this.groups = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  public createSubmit() {
    this.contactService.createContact(this.contact).subscribe((data) => {
      this.router.navigate(['/']).then();
      this.toasterService.show('New contact added successfully', {
        classname: 'bg-success text-light',
        delay: 5000,
        autohide: true,
        headertext: 'Success'
      })
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
      this.toasterService.show(`Problems adding new contact. Error: ${error}`, {
        classname: 'bg-danger text-light',
        autohide: false,
        headertext: 'Error'
      })
    })
  }

}
