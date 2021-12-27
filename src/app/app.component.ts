import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  calculatedValue: number = 0;
  @ViewChild('hypotheekbedrag') hypotheekBedrag!: ElementRef<HTMLInputElement>;
  @ViewChild('hypotheekrente') hypotheekRente!: ElementRef<HTMLInputElement>;
  @ViewChild('hypotheektijd') hypotheekTijd!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.calculate();
  }

  calculate() {
    const looptijd = parseInt(this.hypotheekTijd.nativeElement.value);
    const bedrag = parseInt(this.hypotheekBedrag.nativeElement.value);
    const maandelijkseRente = parseFloat(this.hypotheekRente.nativeElement.value) / 100 /12;

    this.calculatedValue = this.calculateInterest(maandelijkseRente, looptijd * 12, bedrag, 0);
  }

  private calculateInterest(ir: any, np: number, pv: number, fv: number, type = 0) {
    /*
     * ir   - interest rate per month
     * np   - number of periods (months)
     * pv   - present value
     * fv   - future value
     * type - when the payments are due:
     *        0: end of the period, e.g. end of month (default)
     *        1: beginning of period
     */
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return -pmt;
  }
}
