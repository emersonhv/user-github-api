import { Component, OnInit } from '@angular/core';
import { GithubService } from '@services/github.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [],
  templateUrl: './user-chart.component.html',
  styleUrl: './user-chart.component.css',
})
export class UserChartComponent implements OnInit {
  chart: any;

  constructor(private githubService: GithubService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  
  loadUserData() {
    const query = 'a';
    this.githubService.searchUsersPromise(query).then((response) => {
        const users = response.items.slice(0, 10);
        const names = users.map((user:any) => user.login);
        let followers: number[] = [];
        names.forEach((n:string) => {
          this.githubService.searchUsersFollowersPromise(n).then((response) => {
            followers.push(response);
          });
        });
        this.createChart(names, followers); 
    }).catch((error) => {
        console.error('Error al obtener los usuarios:', error);
    });
  }

  createChart(names: any[], followers: number[]) {
 
    this.chart = new Chart('userChart', {
      type: 'bar', 
      data: {
        labels: names, 
        datasets: [
          {
            label: 'Número de seguidores', 
            data: followers, 
            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1, 
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, 
          },
        },
      },
    });

    setInterval(() => {
      this.chart.data.datasets[0].data = followers;
      this.chart.update();
    }, 1000);
  }
}
