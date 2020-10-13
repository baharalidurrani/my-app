import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  loading = true;
  camsList: any;
  user: any;

  constructor(private graphService: GraphService) {}

  async ngOnInit(): Promise<void> {
    this.graphService.userOrg$.subscribe((result) => {
      this.user = result.data.userOrganization;
      this.loading = result.loading;
      console.log('this.userOrg', this.user);
    });
  }
}