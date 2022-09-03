export class SignUpViewModel {
    username!:string;
    email!:string;
    password!:string;
    constructor(username:any,email:any,password:any){
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
