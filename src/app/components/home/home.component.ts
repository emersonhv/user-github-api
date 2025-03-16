import { Component } from '@angular/core';
import { UserSearchComponent } from '@components/user-search/user-search.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UserChartComponent } from "@components/user-chart/user-chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserSearchComponent, UserListComponent, UserChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
