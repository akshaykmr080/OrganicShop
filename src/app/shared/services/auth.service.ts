import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppUser } from '../models/app.user';
//import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userservice: UserService, private router: Router) {
    this.user$ = afAuth.authState;
  }

  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);


    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    console.log('logging out');
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);

  }

  get appUser$(): Observable<AppUser>{
    return this.user$
    .switchMap(user => {
      if (user){
        return this.userservice.get(user.uid);
      } else {
        return Observable.of(null);
      }
     });
  }
}
