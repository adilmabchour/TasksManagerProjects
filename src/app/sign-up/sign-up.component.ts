import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { SignUpViewModel } from '../models/sign-up-view-model';
import { CustomValidatorsService } from '../services/custom-validators.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmitted = false;
  signUpViewModel!: SignUpViewModel;
  //formGroupe!: FormGroup;
  //skills!:FormArray;
  genders = ["male", "female"];
  roles:Role[] = [
    {id:1, name:"ROLE USER"},
    {id:2, name:"ROLE MODERATOR"},
    {id:3, name:"ROLE ADMIN"},
  ]
  constructor(private formBuilder:FormBuilder, 
              private customValidatorsService: CustomValidatorsService,
              private service: LoginService,
              private router: Router
            ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      personAuth: this.formBuilder.group({
        username: [null,[Validators.required,Validators.minLength(2)]],
        email: [null,[Validators.required,Validators.email]]
      }),
      password: [null,[Validators.required]],
      passwordConfirm: [null,[Validators.required]],
      role: [null,[Validators.required]],
      gender: [null,[Validators.required]],
      age: [null,[Validators.required,Validators.pattern("^[0-9]*$")]],
      receiveNewsLetters: null,
      dateOfBirth:[null, [Validators.required,this.customValidatorsService.minimumAgeValidator(18)]],
      skills: this.formBuilder.array([])
    },{
      validator: this.customValidatorsService.comparisonValidator
    });
    //this.skills = this.signUpForm.get('skills') as FormArray;
  }
  
  onSubmitClick(){
    this.isSubmitted = true;
    if(this.signUpForm.valid){
      this.signUpViewModel = new SignUpViewModel(
                                          this.signUpForm.get('personAuth.username')?.value,
                                          this.signUpForm.get('personAuth.email')?.value,
                                          this.signUpForm.get('password')?.value
                                          );
      this.service.registre(this.signUpViewModel).subscribe(
        (rep) => {
          this.router.navigateByUrl("login");
        },
        (error) => {
          if(error.error.message){
            this.signUpForm.get("personAuth.username")?.setErrors({ 'userExiste': true });
            //this.customValidatorsService.userExiste
            alert(error.error.message);
          }else{
            console.log(error);
          }
        }
      );
    }else{
      console.log("form invalid");
    }
  }

  onAddSkill(){
    let formGroupe = new FormGroup({
      skillName: new FormControl(null),
      level: new FormControl(null)
    });
    (<FormArray>this.signUpForm.get('skills')).push(formGroupe);
  }

  onRemoveSkill(index:number){
    (<FormArray>this.signUpForm.get('skills')).removeAt(index);
  }

}
