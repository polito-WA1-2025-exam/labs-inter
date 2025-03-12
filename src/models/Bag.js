import dayjs from 'dayjs';

function Bag(id, type, price, size, status, start_date, end_date, establishment={}, foods=[],user = {})
{
    this.id = id;
    this.type = type;
    this.price = price;
    this.size = size;
    this.status = status;
    this.start_date = dayjs().add(start_date, 'day').format('YYYY-MM-DD HH:mm');
    this.end_date = dayjs().add(end_date, 'day').format('YYYY-MM-DD HH:mm');
    this.establishment = establishment;
    this.foodsDeleted = []
    this.foods = foods;
    this.user = user

    this.addFood = function(food)
    {
        if(this.type == "regular")
        {
            console.log("food added in addFodd");
            this.foods.push(food);
            return true
        }

        console.log("food can not be added in addFodd");
        return false

    }
    this.removeFood = function(id)
    {
        if(this.type == "regular" && this.foodsDeleted.length < 2)
        {
            const index = this.foods.findIndex(food => food.getId() == id);
            if(index != -1)
            {
                const foodDeleted = this.foods.split(index,1);
                this.foodsDeleted.push(foodDeleted);
                return true
            }

            console.log("food not found in removeFood");
            return false
        }
        console.log("food can not be removed in removeFood");
        return false
    }
    this.isReserved = () => this.status == "reserved"
    this.isAvailable = () => this.status == "available"
    this.makeReserved = () => this.status = "reserved"
    this.getID = () => this.id;


    this.reserve = function (user) {
        if (this.state === "available") {
            this.state = "reserved";
            this.user = user;
            console.log(`Bag ${this.id} reserved by user ${user}`);
            return true;
        }

        console.log(`Bag ${this.id} is not available for reservation`);
        return false;
    }
    this.equalTo = function(bag)
    {
        return this.id == bag.id;
    }

    this.setEstablishment = function(est)
    {
        this.establishment = est;
    }

    this.getId = () => this.id;
    this.getDeadline = () => this.end_date;
    this.getEstablishment = () => this.establishment;
    this.getPrice = () => this.price;

    this.release = () => {
        if(this.state == "reserved")
        {
            this.state = "available";
            console.log("Bag has been released in release");
            return true;
        }
        console.log("Bag was not reserved at all in release");
        return false;
    }

    this.display = () => {
        console.log(`Bag Type: ${this.type}`);
        console.log(`Bag Price: ${this.price}`);
        console.log(`Bag Size: ${this.size}`);
        console.log(`Bag Establishment: ${this.establishment}`);
        console.log(`Bag Time to pick up: ${this.end_date}`);
        console.log(`Bag Content:`);
        this.foods.forEach(item => item.display());
        console.log('--------------------------');
    }

}
export default Bag;