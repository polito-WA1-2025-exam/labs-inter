function User(id,name,email,shoppingCart=null)
{
    this.id=id;
    this.name = name;
    this.email = email;
    this.shoppingCart = shoppingCart

    this.display = () => {
        console.log(`User Id: ${this.id}`);
        console.log(`User Name: ${this.name}`);
    }
}

export default User;