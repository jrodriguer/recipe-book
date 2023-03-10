import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import '@dile/dile-hamburger/dile-hamburger.js';

import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  public isAuthenticated = false;

  constructor(
    private dataStorageSrv: DataStorageService,
    private authSrv: AuthService
  ) {}

  ngOnInit() {
    this.authSrv.user.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onLogout() {
    this.authSrv.logout();
  }

  onSaveData() {
    this.dataStorageSrv.storageRecipes();
  }

  onFetchData() {
    this.dataStorageSrv.fetchRecipes().subscribe();
  }
}
