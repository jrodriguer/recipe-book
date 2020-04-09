import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub: Subscription;
    public isAuthenticated: boolean;

    constructor(
        private dataStorageSrv: DataStorageService,
        private authSrv: AuthService,
    ) {}

    ngOnInit() {
        this.userSub = this.authSrv.user.subscribe(user => {
            this.isAuthenticated = !!user; // !user ? false : true
        });
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

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
