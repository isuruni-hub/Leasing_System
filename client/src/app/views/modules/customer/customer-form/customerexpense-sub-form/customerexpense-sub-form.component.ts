import {Component, forwardRef, Input, OnInit} from '@angular/core'
import {AbstractSubFormComponent} from '../../../../../shared/ui-components/abstract-sub-form/abstract-sub-form.component';
import {Customerexpense} from '../../../../../entities/customerexpense';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-customerexpense-sub-form',
  templateUrl: './customerexpense-sub-form.component.html',
  styleUrls: ['./customerexpense-sub-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerexpenseSubFormComponent),
      multi: true
    }, {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomerexpenseSubFormComponent),
      multi: true
    }
  ]
})
export class CustomerexpenseSubFormComponent extends AbstractSubFormComponent<Customerexpense> implements OnInit {

  constructor(
    protected dialog: MatDialog) {
    super();
  }

  fileValidations = {
    title: [],
    amount: [],
  };

  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', this.fileValidations.title),
    amount: new FormControl('', this.fileValidations.amount),
  });

  get idField(): FormControl{
    return this.form.controls.id as FormControl;
  }

  get titleField(): FormControl{
    return this.form.controls.title as FormControl;
  }

  get amountField(): FormControl{
    return this.form.controls.amount as FormControl;
  }

  setValidations(): void{
    this.fileValidations.title = [Validators.required];
    this.fileValidations.amount = [Validators.required];
  }

  removeValidations(): void{
    this.fileValidations.title = [];
    this.fileValidations.amount = [];
  }

  get isFormEmpty(): boolean {
    return this.isEmptyField(this.idField)
      &&   this.isEmptyField(this.titleField)
      &&   this.isEmptyField(this.amountField)
  }

  ngOnInit(): void {

  }

  fillForm(dataItem: Customerexpense): void {
    this.idField.patchValue(dataItem.id);
    this.titleField.patchValue(dataItem.title);
    this.amountField.patchValue(dataItem.amount);
  }

  resetForm():void{
    this.form.reset();
    this.removeValidations();
  }

  getDeleteConfirmMessage(dataItem: Customerexpense): string {
    return 'Are you sure to remove \u201C ${dataItem.title} \u201C from income list ?';
  }

  getUpdateConfirmMessage(dataItem: Customerexpense): string {
    if (this.isFormEmpty){
      return 'Are you sure to update \u201C\u00A0${dataItem.title}\u00A0\u201D\u00A0?';
    }
    return 'Are you sure to update \u201C\u00A0${dataItem.title}\u00A0\u201D and discard existing form data\u00A0?';

  }

  addData(): void {
    if (this.form.invalid){return;}

    const dataItem:Customerexpense = new Customerexpense();
    dataItem.id = this.idField.value;
    dataItem.title = this.titleField.value;
    dataItem.amount = parseFloat(this.amountField.value);
    this.addToTop(dataItem);
    this.resetForm();


  }

  customValidations(): object {
    return undefined;
  }


}
