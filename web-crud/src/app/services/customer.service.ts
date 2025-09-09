// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { Observable } from 'rxjs';
// // import { environment } from '../../environments/environment';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class CustomerService {
// //   private apiUrl = environment.apiUrl;

// //   constructor(private http: HttpClient) {}

// //   getCustomers(): Observable<any[]> {
// //     return this.http.get<any[]>(this.apiUrl);
// //   }

// //   createCustomer(customer: any): Observable<any> {
// //     return this.http.post<any>(this.apiUrl, customer);
// //   }

// //   updateCustomer(id: number, customer: any): Observable<any> {
// //     return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
// //   }

// //   deleteCustomer(id: number): Observable<any> {
// //     return this.http.delete<any>(`${this.apiUrl}/${id}`);
// //   }
// // }





// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {
//   private baseUrl = environment.apiUrl; // ✅ update if backend URL is different

//   constructor(private http: HttpClient) {}

//   // Get all customers
//   // getCustomers(): Observable<any[]> {
//   //   return this.http.get<any[]>(this.baseUrl);
//   // }


//   getCustomers(): Observable<any[]> {
//   return this.http.get<any[]>(this.baseUrl).pipe(
//     map(customers =>
//       customers.map(c => ({
//         id: c.id,
//         firstName: c.first_name,
//         lastName: c.last_name,
//         phone: c.phone,
//         email: c.email,
//         address: c.address,
//         city: c.city,
//         state: c.state,
//         pin: c.pin,
//         accountType: c.account_type
//       }))
//     )
//   );
// }


//   // Add new customer
//   // addCustomer(customer: any): Observable<any> {
//   //   return this.http.post<any>(this.baseUrl, customer);
//   // }

//   addCustomer(customer: any): Observable<any> {
//     return this.http.post<any>(this.baseUrl, {
//       first_name: customer.firstName,
//       last_name: customer.lastName,
//       phone: customer.phone,
//       email: customer.email,
//       address: customer.address,
//       city: customer.city,
//       state: customer.state,
//       pin: customer.pin,
//       account_type: customer.accountType
//     });
//   }



//   // Update customer
//   updateCustomer(id: number, customer: any): Observable<any> {
//     return this.http.put<any>(`${this.baseUrl}/${id}`, customer);
//   }

//   // Delete customer
//   deleteCustomer(id: number): Observable<any> {
//     return this.http.delete<any>(`${this.baseUrl}/${id}`);
//   }
// }



///updated code dont remove this

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {
//   private baseUrl = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   getCustomers(): Observable<any[]> {
//   return this.http.get<any[]>(this.baseUrl).pipe(
//     map(customers =>
//       customers.map(c => ({
//         id: c.id,
//         firstName: c.first_name,
//         lastName: c.last_name,
//         phone: c.phone,
//         email: c.email,
//         address: c.address,
//         city: c.city,
//         state: c.state,
//         pin: c.pin,
//         accountType: c.account_type
//       }))
//     )
//   );
// }


//   addCustomer(customer: any): Observable<any> {
//   const payload = {
//     first_name: customer.firstName,
//     last_name: customer.lastName,
//     phone: customer.phone,
//     email: customer.email,
//     address: customer.address,
//     city: customer.city,
//     state: customer.state,
//     pin: customer.pin,
//     account_type: customer.accountType
//   };
//   return this.http.post<any>(this.baseUrl, payload);
// }

// updateCustomer(id: number, customer: any): Observable<any> {
//   const payload = {
//     first_name: customer.firstName,
//     last_name: customer.lastName,
//     phone: customer.phone,
//     email: customer.email,
//     address: customer.address,
//     city: customer.city,
//     state: customer.state,
//     pin: customer.pin,
//     account_type: customer.accountType
//   };
//   return this.http.put<any>(`${this.baseUrl}/${id}`, payload);
// }

// // 🔹 Get addresses of a customer
// getAddresses(customerId: number): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/${customerId}/addresses`);
// }

// // 🔹 Add new address
// addAddress(customerId: number, address: any): Observable<any> {
//   const payload = {
//     address: address.address,
//     city: address.city,
//     state: address.state,
//     pin: address.pin
//   };
//   return this.http.post<any>(`${this.baseUrl}/${customerId}/addresses`, payload);
// }

// // 🔹 Update address
// updateAddress(addressId: number, address: any): Observable<any> {
//   const payload = {
//     address: address.address,
//     city: address.city,
//     state: address.state,
//     pin: address.pin
//   };
//   return this.http.put<any>(`/api/addresses/${addressId}`, payload);
// }

// // 🔹 Delete address
// deleteAddress(addressId: number): Observable<any> {
//   return this.http.delete<any>(`/api/addresses/${addressId}`);
// }

//   // deleteCustomer(id: number): Observable<any> {
//   //   return this.http.delete<any>(`${this.baseUrl}/${id}`);
//   // }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🔹 Customers ------------------------------

  // getCustomers(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/customers`).pipe(
  //     map(customers =>
  //       customers.map(c => ({
  //         id: c.id,
  //         firstName: c.first_name,
  //         lastName: c.last_name,
  //         phone: c.phone,
  //         email: c.email,
  //         address: c.address,
  //         city: c.city,
  //         state: c.state,
  //         pin: c.pin,
  //         accountType: c.account_type,
  //         addressCount: c.address_count
  //       }))
  //     )
  //   );
  // }


  getCustomers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/customers`).pipe(
    map(customers =>
      customers.map(c => ({
        id: c.id,
        firstName: c.firstName,
        lastName: c.lastName,
        phone: c.phone,
        email: c.email,
        city: c.city,
        state: c.state,
        pin: c.pin,
        accountType: c.accountType,
        addressCount: c.addressCount   // ✅ key mapping
      }))
    )
  );
}



  addCustomer(customer: any): Observable<any> {
    const payload = {
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pin: customer.pin,
      account_type: customer.accountType
    };
    return this.http.post<any>(`${this.baseUrl}/customers`, payload).pipe(
      map(c => ({
        id: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        phone: c.phone,
        email: c.email,
        address: c.address,
        city: c.city,
        state: c.state,
        pin: c.pin,
        accountType: c.account_type
      }))
    );
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    const payload = {
      first_name: customer.firstName,
      last_name: customer.lastName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pin: customer.pin,
      account_type: customer.accountType
    };
    return this.http.put<any>(`${this.baseUrl}/customers/${id}`, payload).pipe(
      map(c => ({
        id: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        phone: c.phone,
        email: c.email,
        address:c.address,
        city: c.city,
        state: c.state,
        pin: c.pin,
        accountType: c.account_type
      }))
    );
  }

//   deleteCustomer(id: string): Observable<any> {
//   return this.http.delete<any>(`${this.baseUrl}/${id}`);
// }
// // web-crud/service/customer.service.ts

// deleteCustomer(id: string) {
//   return this.http.delete(`${this.apiUrl}/customers/${id}`);
// }

// deleteAddress(addressId: number) {
//   return this.http.delete(`${this.apiUrl}/addresses/${addressId}`);
// }
// ✅ Delete customer (and all addresses via backend)
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/customers/${id}`);
  }

  // ✅ Delete address
  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/addresses/${addressId}`);
  }


  // 🔹 Addresses ------------------------------

  getAddresses(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/customers/${customerId}/addresses`).pipe(
      map(addresses =>
        addresses.map(a => ({
          id: a.id,
          customerId: a.customer_id,
          addressLine: a.address_line,
          city: a.city,
          state: a.state,
          pin: a.pin,
          accountType: a.account_type
        }))
      )
    );
  }

  addAddress(customerId: number, address: any): Observable<any> {
    const payload = {
      address_line: address.addressLine,
      city: address.city,
      state: address.state,
      pin: address.pin,
      account_type: address.accountType
    };
    return this.http.post<any>(`${this.baseUrl}/customers/${customerId}/addresses`, payload).pipe(
      map(a => ({
        id: a.id,
        customerId: a.customer_id,
        addressLine: a.address_line,
        city: a.city,
        state: a.state,
        pin: a.pin,
        accountType: a.account_type,
      }))
    );
  }

  updateAddress(addressId: number, address: any): Observable<any> {
    const payload = {
      address_line: address.addressLine,
      city: address.city,
      state: address.state,
      pin: address.pin
    };
    return this.http.put<any>(`${this.baseUrl}/addresses/${addressId}`, payload).pipe(
      map(a => ({
        id: a.id,
        customerId: a.customer_id,
        addressLine: a.address_line,
        city: a.city,
        state: a.state,
        pin: a.pin,
        accountType: a.account_type,
      }))
    );
  }

  // deleteAddress(addressId: number): Observable<any> {
  //   return this.http.delete<any>(`${this.baseUrl}/addresses/${addressId}`);
  // }
  
  // 🔹 Address Status (Only One vs Multiple)
  getAddressStatus(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/customers/${customerId}/address-status`);
  }

  // Customers with multiple addresses
getCustomersWithMultipleAddresses(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/customers/multiple-addresses`);
}

// Customers with only one address
getCustomersWithOneAddress(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/customers/only-one-address`);
}

// Search by city/state/pin
// searchCustomers(filters: any): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/customers/search`, { params: filters });
// }

searchCustomers(filters: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/customers/search`, { params: filters }).pipe(
    map(customers =>
      customers.map(c => ({
        id: c.id,
        firstName: c.firstName ?? c.first_name,
        lastName: c.lastName ?? c.last_name,
        phone: c.phone,
        email: c.email,
        address: c.addressLine ?? c.address,
        city: c.city,
        state: c.state,
        pin: c.pin,
        accountType: c.accountType ?? c.account_type,
        addressCount: c.addressCount ?? c.address_count   // ✅ fix here too
      }))
    )
  );
}
}
