import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/dashboard.service';

export interface IStock {
  id: number;
  name: string;
}
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
})
export class StockTableComponent implements AfterViewInit, OnInit {
  constructor(private dashboardService: DashboardService) {}
  private items$: any;
  displayedColumns: string[] = ['id', 'name'];
  dataSource: IStock[] = [];
  searchText: string = '';
  sortField: string = '';

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.items$ = this.dashboardService.getStocks();

    this.items$.valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.stocks;
    });
  }
  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() =>
      this.items$.refetch({
        sort: {
          by: this.sort.active,
          order: this.sort.direction.toUpperCase(),
        },
      }),
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.items$.refetch({
      filter: [
        {
          by: 'name',
          value: filterValue,
        },
      ],
    });
  }
}
