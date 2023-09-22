import { OnInit, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardService } from 'src/app/dashboard.service';
import { IEntry } from 'src/app/entry-table/entry-table.component';

@Component({
  selector: 'create-exit-modal',
  templateUrl: 'create-exit-modal.html',
  styleUrls: ['create-exit-modal.scss'],
})
export class CreateExitModal {
  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private _mdr: MatDialogRef<CreateExitModal>,
    @Inject(MAT_DIALOG_DATA) public entryId: string,
  ) {}

  entries: IEntry[] = [];

  registerForm = new FormGroup({
    quantity: new FormControl('', [Validators.required]),
  });

  async onSubmit() {
    console.log(this.entryId);
    if (!this.entryId || !this.registerForm.value.quantity) return;

    this.dashboardService
      .createExit({
        quantity: +this.registerForm.value.quantity,
        entryId: +this.entryId,
      })
      .subscribe(
        ({ data }: any) => {
          this.snackBar.open('Saída criada com sucesso!', 'Fechar', {
            duration: 2000,
          });
        },
        (error) => {
          console.log(error.message);
          this.snackBar.open(
            error.message + '!' || 'Erro ao criar saída.',
            'Fechar',
            {
              duration: 2000,
            },
          );
        },
      );
  }
}
