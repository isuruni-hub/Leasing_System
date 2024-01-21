import {Component, forwardRef, Input, OnInit} from '@angular/core'
import {AbstractSubFormComponent} from '../../../../../shared/ui-components/abstract-sub-form/abstract-sub-form.component';
import {Installment} from '../../../../../entities/installment';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-installment-sub-form',
  templateUrl: './installment-sub-form.component.html',
  styleUrls: ['./installment-sub-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InstallmentSubFormComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InstallmentSubFormComponent),
      multi: true
    }
  ]
})
export class InstallmentSubFormComponent extends AbstractSubFormComponent<Installment> implements OnInit {

  constructor(
    protected dialog: MatDialog) {
    super();
  }

  fileValidations = {
    date: [],
    amount: [],
  };

  form = new FormGroup({
    id: new FormControl(null),
    date: new FormControl('', this.fileValidations.date),
    amount: new FormControl('', this.fileValidations.amount),
  });

  get idField(): FormControl{
    return this.form.controls.id as FormControl;
  }

  get dateField(): FormControl{
    return this.form.controls.date as FormControl;
  }

  get amountField(): FormControl{
    return this.form.controls.amount as FormControl;
  }

  setValidations(): void{
    this.fileValidations.date = [Validators.required];
    this.fileValidations.amount = [Validators.required];
  }

  removeValidations(): void{
    this.fileValidations.date = [];
    this.fileValidations.amount = [];
  }

  get isFormEmpty(): boolean {
    return this.isEmptyField(this.idField)
      &&   this.isEmptyField(this.dateField)
      &&   this.isEmptyField(this.amountField)
  }

  ngOnInit(): void {

  }

  fillForm(dataItem: Installment): void {
    this.idField.patchValue(dataItem.id);
    this.dateField.patchValue(dataItem.date);
    this.amountField.patchValue(dataItem.amount);
  }

  resetForm():void{
    this.form.reset();
    this.removeValidations();
  }

  getDeleteConfirmMessage(dataItem: Installment): string {
    return 'Are you sure to remove \u201C ${dataItem.date} \u201C from income list ?';
  }

  getUpdateConfirmMessage(dataItem: Installment): string {
    if (this.isFormEmpty){
      return 'Are you sure to update \u201C\u00A0${dataItem.date}\u00A0\u201D\u00A0?';
    }
    return 'Are you sure to update \u201C\u00A0${dataItem.date}\u00A0\u201D and discard existing form data\u00A0?';

  }

  addData(): void {
    if (this.form.invalid){return;}

    const dataItem:Installment = new Installment();
    dataItem.id = this.idField.value;
    dataItem.date = this.dateField.value;
    dataItem.amount = parseFloat(this.amountField.value);
    this.addToTop(dataItem);
    this.resetForm();


  }

  customValidations(): object {
    return undefined;
  }


}
