function Food(id,name,quantity)
{
    this.id=id;
    this.name = name;
    this.quantity = quantity;

    this.getID = () => this.id;

    this.display = () => {
        console.log(`(Quantity x Name) ${item.quantity}x${item.name}`)
    }
}
export default Food;