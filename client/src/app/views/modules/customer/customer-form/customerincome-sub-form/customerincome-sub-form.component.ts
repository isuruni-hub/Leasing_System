import {Component, forwardRef, Input, OnInit} from '@angular/core'
import {AbstractSubFormComponent} from '../../../../../shared/ui-components/abstract-sub-form/abstract-sub-form.component';
import {Customerincome} from '../../../../../entities/customerincome';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-customerincome-sub-form',
  templateUrl: './customerincome-sub-form.component.html',
  styleUrls: ['./customerincome-sub-form.component.scss'],
providers: [
{
   provide: NG_VALUE_ACCESSOR,
   useExisting: forwardRef(() => CustomerincomeSubFormComponent),
   multi: true
 }, {
   provide: NG_VALIDATORS,
   useExisting: forwardRef(() => CustomerincomeSubFormComponent),
   multi: true
 }
  ]
})
export class CustomerincomeSubFormComponent extends AbstractSubFormComponent<Customerincome> implements OnInit {

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

  fillForm(dataItem: Customerincome): void {
    this.idField.patchValue(dataItem.id);
    this.titleField.patchValue(dataItem.title);
    this.amountField.patchValue(dataItem.amount);
  }

  resetForm():void{
    this.form.reset();
    this.removeValidations();
  }

  getDeleteConfirmMessage(dataItem: Customerincome): string {
    return 'Are you sure to remove \u201C ${dataItem.title} \u201C from income list ?';
  }

  getUpdateConfirmMessage(dataItem: Customerincome): string {
    if (this.isFormEmpty){
      return 'Are you sure to update \u201C\u00A0${dataItem.title}\u00A0\u201D\u00A0?';
    }
      return 'Are you sure to update \u201C\u00A0${dataItem.title}\u00A0\u201D and discard existing form data\u00A0?';

    }

    addData(): void {
    if (this.form.invalid){return;}

    const dataItem:Customerincome = new Customerincome();
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
