import { Observable } from 'rxjs/observable';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userservice: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => {
      if (appUser.isAdmin) {
        return true;
      } else {
        // this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
