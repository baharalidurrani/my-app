import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable, Subscription } from 'rxjs';
import {
  SiteType,
  UserOrganizationGQL,
  UserOrganizationQuery,
  UserType,
} from '../../generated/graphql';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css'],
})
export class ExplorerComponent implements OnInit, OnDestroy {
  constructor(private userOrg: UserOrganizationGQL) {}
  userOrg$: Observable<ApolloQueryResult<UserOrganizationQuery>>;
  user: UserType;
  userOrgSub: Subscription;
  selectedSite: SiteType;
  ngOnInit(): void {
    this.userOrg$ = this.userOrg.fetch();
    this.userOrgSub = this.userOrg$.subscribe((result) => {
      this.user = result.data.userOrganization;
      console.log(
        '%cexplorer.component.ts line:24 this.user',
        'color: #007acc;',
        this.user
      );
    });
  }
  onClickHandler(site: SiteType) {
    if (this.selectedSite) this.selectedSite = null;
    else this.selectedSite = site;
  }
  ngOnDestroy() {
    this.userOrgSub.unsubscribe();
  }
}
