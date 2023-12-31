import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DashboardService, IStock } from 'src/app/dashboard.service';
import { IFood } from 'src/app/food-table/food-table.component';
import { CreateEntryModal } from 'src/app/modals/createEntryModal/create-entry-modal';
import { CreateExitModal } from 'src/app/modals/createExitModal/create-exit-modal';

export interface IEntry {
  food: IFood;
  stock: IStock;
  quantity: number;
}

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.scss'],
})
export class EntryTableComponent implements AfterViewInit, OnInit {
  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
  ) {}
  private items$: any;
  foods: IFood[] = [];
  displayedColumns: string[] = ['id', 'quantity', 'food', 'stock', 'actions'];
  dataSource: IEntry[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    (this.items$ = this.dashboardService.getEntries({
      sort: {
        by: 'id',
        order: 'ASC',
      },
    })),
      //getentries
      this.items$.valueChanges.subscribe((result: any) => {
        this.dataSource = result.data.entries;
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
    this.items$.refetch({
      filterByFoodName: filterValue,
    });
  }

  openDialog() {
    this.dialog.open(CreateEntryModal);
  }
  openDialogCreateExit(entryId: number) {
    this.dialog.open(CreateExitModal, {
      data: entryId,
    });
  }
}
