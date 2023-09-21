import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { DashboardService, IStock } from 'src/app/dashboard.service';
import { IFood } from 'src/app/food-table/food-table.component';
import { CreateEntryModal } from 'src/app/modals/createEntryModal/create-entry-modal';

interface IEntry {
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
  displayedColumns: string[] = ['id', 'quantity', 'food', 'stock'];
  dataSource: IEntry[] = [];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    this.items$ = this.dashboardService.getEntries();

    this.items$.valueChanges.subscribe((result: any) => {
      this.dataSource = result.data.entries;
      console.log(result.data.entries);
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
  openDialog() {
    this.dialog.open(CreateEntryModal, {
      data: {
        animal: 'panda',
      },
    });
  }
}
