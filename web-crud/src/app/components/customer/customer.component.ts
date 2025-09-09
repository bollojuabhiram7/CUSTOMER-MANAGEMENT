// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CustomerService } from '../../services/customer.service';
// import { MatSnackBar } from '@angular/material/snack-bar';


// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.scss']
// })
// export class CustomerComponent implements OnInit {
//   customerForm!: FormGroup;
//   customers: any[] = [];
//   searchText: string = '';   // 🔹 bound to search input
//   editingCustomerId: number | null = null;
  

//   displayedColumns: string[] = [
//     'id',
//     'name',
//     'phone',
//     'email',
//     'city',
//     'accountType',
//     'actions'
//   ];


//   constructor(
//     private fb: FormBuilder,
//     private customerService: CustomerService,
//      private snackBar: MatSnackBar  
//   ) {}

//   ngOnInit(): void {
//     this.customerForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       address: [''],
//       city: [''],
//       state: [''],
//       pin: [''],
//       accountType: ['', Validators.required],
//     });

//     this.getAllCustomers();
//   }

//   // 🔹 Fetch all customers
//   getAllCustomers() {
//     this.customerService.getCustomers().subscribe({
//       next: (data) => this.customers = data,
//       error: (err) => console.error('Error fetching customers', err)
//     });
//   }

//   // 🔹 Add / Update customer
//   onSubmit() {
//     if (this.customerForm.invalid) return;

//     if (this.editingCustomerId) {
//       this.customerService.updateCustomer(this.editingCustomerId, this.customerForm.value).subscribe({
//         next: () => {
//           this.getAllCustomers();
//           this.onReset();
//         },
//         error: (err) => console.error('Error updating customer', err)
//       });
//     } else {
//       this.customerService.addCustomer(this.customerForm.value).subscribe({
//         next: () => {
//           this.getAllCustomers();
//           this.onReset();
//         },
//         error: (err) => console.error('Error adding customer', err)
//       });
//     }
//   }

//   // 🔹 Reset form
//   onReset() {
//     this.customerForm.reset();
//     this.editingCustomerId = null;
//   }

//   // 🔹 Edit customer
//   onEdit(customer: any) {
//     this.editingCustomerId = customer.id;
//     this.customerForm.patchValue(customer);
//   }

//   // 🔹 Delete customer
//   onDelete(id: number) {
//     if (!confirm('Are you sure you want to delete this customer?')) return;
//     this.customerService.deleteCustomer(id).subscribe({
//       next: () => this.getAllCustomers(),
//       error: (err) => console.error('Error deleting customer', err)
//     });
//   }

//   // 🔹 Filter customers based on search text
// //   filteredCustomers() {
// //     if (!this.searchText) return this.customers;

// //     const search = this.searchText.toLowerCase();
// //     return this.customers.filter(c =>
// //       (c.firstName + ' ' + c.lastName).toLowerCase().includes(search) ||
// //       (c.phone || '').toLowerCase().includes(search) ||
// //       (c.email || '').toLowerCase().includes(search) ||
// //       (c.city || '').toLowerCase().includes(search)
// //     );
// //   }
// // displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'city', 'accountType', 'actions'];

// filteredCustomers() {
//   if (!this.searchText) return this.customers;

//   const search = this.searchText.toLowerCase();
//   return this.customers.filter(c =>
//     (c.firstName + ' ' + c.lastName).toLowerCase().includes(search) ||
//     (c.phone || '').toLowerCase().includes(search) ||
//     (c.email || '').toLowerCase().includes(search) ||
//     (c.city || '').toLowerCase().includes(search)
//   );
// }


//   showMessage(message: string, isError: boolean = false) {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000,
//       panelClass: isError ? 'snackbar-error' : 'snackbar-success'
//     });
//   }
// }









// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CustomerService } from '../../services/customer.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.scss']
// })
// export class CustomerComponent implements OnInit {
//   customerForm!: FormGroup;
//   customers: any[] = [];
//   searchText: string = '';
//   editingCustomerId: number | null = null;

//   // 👇 Columns must match table definition in HTML
//   displayedColumns: string[] = [
//     'id',
//     'name',
//     'phone',
//     'email',
//     'city',
//     'account_type',
//     'actions'
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private customerService: CustomerService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.customerForm = this.fb.group({
//       first_name: ['', Validators.required],
//       last_name: ['', Validators.required],
//       phone: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       address: [''],
//       city: [''],
//       state: [''],
//       pin: [''],
//       account_type: ['', Validators.required],
//     });

//     this.getAllCustomers();
//   }

//   getAllCustomers() {
//     this.customerService.getCustomers().subscribe({
//       next: (data) => this.customers = data,
//       error: (err) => console.error('❌ Error fetching customers', err)
//     });
//   }

//   onSubmit() {
//     if (this.customerForm.invalid) return;

//     if (this.editingCustomerId) {
//       this.customerService.updateCustomer(this.editingCustomerId, this.customerForm.value).subscribe({
//         next: () => {
//           this.getAllCustomers();
//           this.onReset();
//           this.showMessage('✅ Customer updated');
//         },
//         error: (err) => this.showMessage('❌ Update failed', true)
//       });
//     } else {
//       this.customerService.addCustomer(this.customerForm.value).subscribe({
//         next: () => {
//           this.getAllCustomers();
//           this.onReset();
//           this.showMessage('✅ Customer added');
//         },
//         error: (err) => this.showMessage('❌ Create failed', true)
//       });
//     }
//   }

//   onReset() {
//     this.customerForm.reset();
//     this.editingCustomerId = null;
//   }

// //   onEdit(customer: any) {
// //     this.editingCustomerId = customer.id;
// //     this.customerForm.patchValue(customer);
// //   }
// onEdit(customer: any) {
//   this.editingCustomerId = customer.id;
//   this.customerForm.patchValue({
//     firstName: customer.firstName || customer.first_name,
//     lastName: customer.lastName || customer.last_name,
//     phone: customer.phone,
//     email: customer.email,
//     address: customer.address,
//     city: customer.city,
//     state: customer.state,
//     pin: customer.pin,
//     accountType: customer.account_type || customer.accountType
//   });
// }

//   onDelete(id: number) {
//     if (!confirm('Are you sure you want to delete this customer?')) return;
//     this.customerService.deleteCustomer(id).subscribe({
//       next: () => {
//         this.getAllCustomers();
//         this.showMessage('🗑️ Customer deleted');
//       },
//       error: (err) => this.showMessage('❌ Delete failed', true)
//     });
//   }

//   filteredCustomers() {
//     if (!this.searchText) return this.customers;
//     const search = this.searchText.toLowerCase();

//     return this.customers.filter(c =>
//       (c.first_name + ' ' + c.last_name).toLowerCase().includes(search) ||
//       (c.phone || '').toLowerCase().includes(search) ||
//       (c.email || '').toLowerCase().includes(search) ||
//       (c.city || '').toLowerCase().includes(search)
//     );
//   }

//   showMessage(message: string, isError: boolean = false) {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000,
//       panelClass: isError ? 'snackbar-error' : 'snackbar-success'
//     });
//   }
// }
 


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  addressForm!: FormGroup;
  customers: any[] = [];
  editingCustomerId: number | null = null;
  selectedCustomer: any = null;
  addresses: any[] = [];

  newCustomer: any = {};
  newAddress: any = {};

  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'city', 'addressStatus','accountType', 'actions'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['',[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
      accountType: ['', Validators.required],
    });

    this.addressForm = this.fb.group({
      addressLine: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      accountType: ['', Validators.required]
    });

    this.getCustomers();
  }

//   getCustomers() {
//   this.customerService.getCustomers().subscribe({
//     next: (data) => {
//       this.customers = data;
//     },
//     error: (err) => {
//       console.error('❌ Error fetching customers:', err);
//       alert('Failed to load customers. Please try again later.');
//     }
//   });
// }
getCustomers() {
  this.customerService.getCustomers().subscribe(data => {
    console.log("✅ Customers API Response:", data);
    this.customers = data;
  });
}
// getCustomers(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/customers`).pipe(
//     map(customers =>
//       customers.map(c => ({
//         id: c.id,
//         firstName: c.firstName,
//         lastName: c.lastName,
//         phone: c.phone,
//         email: c.email,
//         city: c.city,
//         state: c.state,
//         pin: c.pin,
//         accountType: c.accountType,
//         addressCount: c.addressCount   // ✅ key mapping
//       }))
//     )
//   );
// }




  onSubmit() {
    if (this.customerForm.invalid) return;

    if (this.editingCustomerId) {
      this.customerService.updateCustomer(this.editingCustomerId, this.customerForm.value).subscribe(() => {
        this.snackBar.open('✅ Customer updated', 'Close', { duration: 3000 });
        this.getCustomers();
        this.onReset();
      });
    } else {
      this.customerService.addCustomer(this.customerForm.value).subscribe(() => {
        this.snackBar.open('✅ Customer added', 'Close', { duration: 3000 });
        this.getCustomers();
        this.onReset();
      });
    }
  }

  onEdit(customer: any) {
    this.editingCustomerId = customer.id;
  this.customerForm.patchValue({
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    pin: customer.pin,
    accountType: customer.accountType
  });
  }

//   onDelete(id: string) {
//   if (confirm('Delete this customer?')) {
//     this.customerService.deleteCustomer(id).subscribe({
//       next: () => {
//         this.getCustomers();
//         this.snackBar.open('🗑️ Customer deleted successfully', 'Close', {
//           duration: 3000,
//           panelClass: ['snackbar-success']
//         });
//       },
//       error: (err) => {
//         console.error('❌ Error deleting customer:', err);
//         this.snackBar.open('❌ Failed to delete customer', 'Close', {
//           duration: 3000,
//           panelClass: ['snackbar-error']
//         });
//       }
//     });
//   }
// }


//  selectedCustomer: any = null;

// onView(customer: any) {
//   this.selectedCustomer = {
//     id: customer.id,
//     firstName: customer.firstName,
//     lastName: customer.lastName,
//     phone: customer.phone,
//     email: customer.email,
//     address: customer.address,
//     city: customer.city,
//     state: customer.state,
//     pin: customer.pin,
//     accountType: customer.accountType
//   };
// }


// onDelete(id: string) {
//   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//     width: '350px',
//     data: { message: 'Are you sure you want to delete this customer?' }
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       this.customerService.deleteCustomer(id).subscribe({
//         next: () => {
//           this.getCustomers();
//           this.snackBar.open('🗑️ Customer deleted successfully', 'Close', {
//             duration: 3000,
//             panelClass: ['snackbar-success']
//           });
//         },
//         error: (err) => {
//           console.error('❌ Error deleting customer:', err);
//           this.snackBar.open('❌ Failed to delete customer', 'Close', {
//             duration: 3000,
//             panelClass: ['snackbar-error']
//           });
//         }
//       });
//     }
//   });
// }
// web-crud/component/customer/customer.component.ts

onDelete(id: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '350px',
    data: { message: 'Are you sure you want to delete this customer and all their addresses?' }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.getCustomers(); // ✅ Refresh list
          this.snackBar.open('🗑️ Customer and all addresses deleted successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
          });
        },
        error: (err) => {
          console.error('❌ Error deleting customer:', err);
          this.snackBar.open('❌ Failed to delete customer', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  });
}


drawerOpened = false;

onView(customer: any) {
  this.selectedCustomer = customer;
  this.drawerOpened = true;
  this.loadAddresses(customer.id);
}
closeDrawer() {
  this.drawerOpened = false;     // closes sidenav
  this.clearDetails();           // reset customer details if needed
}
clearDetails() {
  this.selectedCustomer = null;
  this.addresses= [];
}
// ================== Addresses ==================
  loadAddresses(customerId: number) {
    this.customerService.getAddresses(customerId).subscribe({
      next: (data) => {
        this.addresses = data;
      },
      error: () => {
        this.snackBar.open('❌ Failed to load addresses', 'Close', { duration: 3000 });
      }
    });
  }


  addAddress() {
    if (!this.selectedCustomer) return;
    if (this.addressForm.invalid) return;

    this.customerService.addAddress(this.selectedCustomer.id, this.addressForm.value).subscribe({
      next: () => {
        this.loadAddresses(this.selectedCustomer.id);
        this.snackBar.open('✅ Address added', 'Close', { duration: 3000 });
        this.addressForm.reset();
      },
      error: () => {
        this.snackBar.open('❌ Failed to add address', 'Close', { duration: 3000 });
      }
    });
  }

  updateAddress(address: any) {
    this.customerService.updateAddress(address.id, address).subscribe({
      next: () => {
        this.loadAddresses(this.selectedCustomer.id);
        this.snackBar.open('✅ Address updated', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('❌ Failed to update address', 'Close', { duration: 3000 });
      }
    });
  }

  // deleteAddress(addressId: number) {
  //   this.customerService.deleteAddress(addressId).subscribe({
  //     next: () => {
  //       this.loadAddresses(this.selectedCustomer.id);
  //       this.snackBar.open('🗑️ Address deleted', 'Close', { duration: 3000 });
  //     },
  //     error: () => {
  //       this.snackBar.open('❌ Failed to delete address', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

  onReset() {
    this.customerForm.reset({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    accountType: ''
  });
  this.editingCustomerId = null;
  }


filters = { city: '', state: '', pin: '' };

searchCustomers() {
  this.customerService.searchCustomers(this.filters).subscribe({
    next: (data) => this.customers = data,
    error: () => this.snackBar.open('❌ Failed to search customers', 'Close', { duration: 3000 })
  });
}

clearFilters() {
  this.filters = { city: '', state: '', pin: '' };
  this.getCustomers();
}

}
