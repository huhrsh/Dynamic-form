import * as bcrypt from 'bcryptjs';

export class User{
    name:string=''
    email:string=''
    password:string=''
    username:string=''

    constructor(name:string='', email:string='',  username:string='', password:string=''){
        const salt = bcrypt.genSaltSync(10);
        let hashedPassword=bcrypt.hashSync(password, salt);
        this.name=name
        this.email=email
        this.password=hashedPassword
        this.username=username
    }
}
