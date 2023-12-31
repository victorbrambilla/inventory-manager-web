import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { FoodTableComponent } from './food-table/food-table.component';
import { EntryTableComponent } from './entry-table/entry-table.component';
import { ExitTableComponent } from './exit-table/exit-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateEntryModal } from 'src/app/modals/createEntryModal/create-entry-modal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateExitModal } from 'src/app/modals/createExitModal/create-exit-modal';

@NgModule({
  declarations: [
    AppComponent,
    StockTableComponent,
    FoodTableComponent,
    EntryTableComponent,
    ExitTableComponent,
    DashboardComponent,
    CreateEntryModal,
    CreateExitModal,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    MatSnackBarModule,
  ],
  providers: [
    // ...
    { provide: MAT_DIALOG_DATA, useValue: {} }, // Adicione esta linha
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
