function Establishment (id,  name, address, phone_number, food_category, type, bags=[])
{
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone_number = phone_number;
    this.food_category = food_category;
    this.type = type;
    this.bags = bags;

    this.addBag= (bagToAdd) => {
        if(!this.bags.some(bag => bag.equalTo(bagToAdd)))
        {
            this.bags.push(bagToAdd)
            bagtoAdd.setEstablishment(this)
        }
    }

    this.removeBag = (bagId) => 
    {
        const index = this.bags.findIndex(bag => bag.getId() == bagId )
        if(index != -1)
        {
            this.bags.split(index,1)
        }
        console.log("Bag not remoedin removeBag")
        return false
    }

    this.getAvailableBags = function() {
        return this.bags.filter(bag => bag.isAvailable());
    }

    this.getReservedBags = function() {
        return this.bags.filter(bag => bag.isReserved());
    }


    this.display = () => {
        console.log(`Establishment Name: ${this.name}`);
        console.log(`Establishment Address: ${this.address}`);
        console.log(`Establishment Phone Number: ${this.phone_number}`);
        console.log(`Establishment Category: ${this.food_category}`);
        console.log(`Establishment Type: ${this.type}`);
        console.log('--------------------------');
    }

    this.equalTo = function(est)
    {
        return this.id == est.id
    }

}