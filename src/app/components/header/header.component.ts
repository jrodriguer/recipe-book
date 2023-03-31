import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;
  public authenticated$ = new Observable<any>();

  constructor(
    private dataStorageSrv: DataStorageService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.authenticated$ = this.authSrv.user;
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
