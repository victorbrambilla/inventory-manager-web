import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService, IStock } from 'src/app/dashboard.service';
import { IFood } from 'src/app/food-table/food-table.component';

@Component({
  selector: 'create-entry-modal',
  templateUrl: 'create-entry-modal.html',
  styleUrls: ['create-entry-modal.scss'],
})
export class CreateEntryModal implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
  ) {}
  foods: IFood[] = [];
  stocks: IStock[] = [];

  registerForm = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
    foodId: new FormControl('', [Validators.required]),
    stockId: new FormControl('', [Validators.required]),
    expirationDate: new FormControl('', [Validators.required]),
  });

  getErrorMessage(control: FormControl, controlName: string): string | null {
    if (control.hasError('required')) {
      return `${controlName} é obrigatório.`;
    }
    return null; // Retorna null se não houver erro
  }

  async onSubmit() {
    if (
      !this.registerForm.value.foodId ||
      !this.registerForm.value.stockId ||
      !this.registerForm.value.quantity ||
      !this.registerForm.value.expirationDate
    )
      return;

    this.dashboardService
      .createEntry({
        foodId: 88,
        stockId: +this.registerForm.value.stockId,
        quantity: +this.registerForm.value.quantity,
        expirationDate: this.registerForm.value.expirationDate,
      })
      .subscribe(
        ({ data }: any) => {
          this.snackBar.open('Entrada criada com sucesso!', 'Fechar', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error.message);
          this.snackBar.open(
            error.message + '!' || 'Erro ao criar entrada.',
            'Fechar',
            {
              duration: 2000,
            },
          );
        },
      );
  }

  ngOnInit(): void {
    this.dashboardService.getFoods().valueChanges.subscribe((result: any) => {
      this.foods = result.data.foods;
    });

    this.dashboardService.getStocks().valueChanges.subscribe((result: any) => {
      this.stocks = result.data.stocks;
    });
  }
}
