import { Observable } from 'rxjs/observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userservice: UserService) { }

  canActivate():Observable<boolean>{

    // A 'map' adds Observable operator to whatever the map returns
    return this.auth.appUser$
    .map(appUser => {
      if (appUser.isAdmin) {
        return true;
      } else {
        // this.router.navigate(['/login']);
        return false;
      }
    });


    // Aswitch map DOES NOT add Observable operator to whatever the switch map returns
    // We can use this also
    // return this.auth.appUser$.switchMap(user => {
    //   if(user.isAdmin){
    //     return Observable.of(user.isAdmin);
    //   } else {
    //     return Observable.of(null);
    //   }
    // });
  }
}
