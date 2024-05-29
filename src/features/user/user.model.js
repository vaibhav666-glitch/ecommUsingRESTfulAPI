
export default class UserModel{
    constructor(name, email,password, type){
       // this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
    }

     

   
    static getAll()
    {
        return users;
    }

}
var users=[{
    id:1,
    name:"seller User",
    email:"seller@ecom.com",
    password:"password1",
    type:"seller"
},
{
    id:2,
    name:"customer User",
    email:"customer@ecom.com",
    password:"password2",
    type:"customer"
}];

