import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  public minimumAgeValidator(minAge: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null =>
    {
      if(!control.value){
        return null;
      }
      var toDay = new Date();
      var dateOfBrith = new Date(control.value);
      var diffMilliSeconds = Math.abs(toDay.getTime() - dateOfBrith.getTime());
      var diffYears = (diffMilliSeconds / (1000 * 60 * 60 * 24)) / 365.25;

      if(diffYears >= minAge){
        return null;
      }else{
        return {minAge: {valid : false}}
      }
    };
  }
  
  public comparisonValidator(g: FormGroup) {
      if (g.get('password')?.value != g.get('passwordConfirm')?.value) {
        g.controls['passwordConfirm'].setErrors({ 'passwordError': true });
        return;
      }
  }

  public userExiste(g: FormGroup) {
    g.controls['personAuth.username'].setErrors({ 'userExiste': true });
    return;
  }

}
