import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from 'src/app/dashboard.service';

interface IEntries {
  id: number;
  quantity: number;
}

export interface IFood {
  id: number;
  name: string;
  unit: {
    name: string;
  };
  entries: IEntries[];
}

interface IFoodMap {
  id: number;
  name: string;
  unitName: string;
  quantity: number;
}
@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.scss'],
})
export class FoodTableComponent implements AfterViewInit, OnInit {
  constructor(private dashboardService: DashboardService) {}
  private items$: any;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'unit'];
  dataSource: IFoodMap[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  ngOnInit(): void {
    this.items$ = this.dashboardService.getFoods();

    this.items$.valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.foods.map((i: IFood) => {
        return {
          id: i.id,
          name: i.name,
          unitName: i.unit.name,
          quantity: i.entries.reduce(
            (total: number, entry: IEntries) => total + entry.quantity,
            0,
          ),
        };
      });
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
