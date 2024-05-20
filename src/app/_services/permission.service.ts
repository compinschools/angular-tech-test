import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private router: Router, private storageService: StorageService, private location: Location) { }

  canActivate(next: ActivatedRouteSnapshot): boolean {

    if(this.storageService.isLoggedIn())
    return true;

    this.router.navigate(['/login'], {queryParams: { returnUrl: encodeURIComponent(this.location.path()) }});

    return false;
   
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean => {
  return inject(PermissionService).canActivate(next);
}
