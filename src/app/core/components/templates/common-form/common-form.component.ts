import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ADD_STOCK } from '@core/const/model-form-key';
import { Stock } from '@core/models/money/stock.model';
import { IFormModal } from '@core/models/template/form-modal-data.model';
import { FormService } from '@core/services/form.service';
import { MoneyService } from '@core/services/money.service';

@Component({
  selector: 'aly-common-form',
  templateUrl: './common-form.component.html',
  styleUrls: ['./common-form.component.scss'],
})
export class CommonFormComponent implements OnInit {
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('formContainer') formContainer: ElementRef;
  public formControl = new FormGroup({
    code: new FormControl(''),
    startPrice: new FormControl(''),
    volume: new FormControl(''),
    margin: new FormControl(0),
  });
  public data: IFormModal;
  public isAddStock = false;
  constructor(
    private formService: FormService,
    private moneyService: MoneyService
  ) {}

  ngOnInit() {
    if (this.data.key === ADD_STOCK) {
      this.isAddStock = true;
    }
    if (this.data.data) {
      this.formControl.patchValue(this.data.data);
    }
  }

  onSubmit() {
    if (this.formControl.invalid) {
      return;
    }

    if (this.isAddStock) {
      const stockInfo: Stock = this.formControl.value;
      stockInfo.code = this.formControl.value.code.toUpperCase();
      stockInfo.startDate = new Date();
      stockInfo.isHoding = true;
      stockInfo.value =
        this.formControl.value.startPrice * this.formControl.value.volume;
      this.moneyService.addStock(stockInfo);
      this.hideForm();
      return;
    }
  }

  onFormClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }

  hideForm() {
    this.overlay.nativeElement.classList.add('hide-smooth');
    this.formContainer.nativeElement.classList.remove(
      'magictime',
      'slideDownReturn'
    );
    this.formContainer.nativeElement.classList.add('magictime', 'slideDown');
    setTimeout(() => {
      this.formService.removeFormComponentFromBody();
    }, 600);
  }
}
