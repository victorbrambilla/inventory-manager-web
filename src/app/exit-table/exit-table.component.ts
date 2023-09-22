import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DashboardService, IStock } from 'src/app/dashboard.service';
import { IEntry } from 'src/app/entry-table/entry-table.component';
import { IFood } from 'src/app/food-table/food-table.component';
import { CreateEntryModal } from 'src/app/modals/createEntryModal/create-entry-modal';
import { CreateExitModal } from 'src/app/modals/createExitModal/create-exit-modal';

interface IExit {
  entry: IEntry;
  stock: IStock;
  quantity: number;
}

@Component({
  selector: 'app-exit-table',
  templateUrl: './exit-table.component.html',
  styleUrls: ['./exit-table.component.scss'],
})
export class ExitTableComponent {
  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
  ) {}
  private items$: any;
  displayedColumns: string[] = ['id', 'quantity', 'stock'];
  dataSource: IExit[] = [];
  foods: IFood[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.items$ = this.dashboardService.getExits();

    this.items$.valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.exits;
    });
    //getfoods

    this.dashboardService.getFoods().valueChanges.subscribe((result: any) => {
      this.foods = result.data.foods;
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
  applyFilterbyFoodName(event: Event) {
    const filterValue = event;
    console.log(filterValue);
    this.items$.refetch({
      filterByFoodName: filterValue,
    });
  }
}
