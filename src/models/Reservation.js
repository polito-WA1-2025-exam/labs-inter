import dayjs from 'dayjs';

function Reservation(id, user, bags, created_at, status,removedItems=[],allergies={},special_requests={})
{
    this.id = id;
    this.user = user;
    this.bags = bags;
    this.created_at = created_at;
    this.status = status;
    this.removedItems = removedItems;
    this.allergies = allergies;
    this.special_requests=special_requests;

    this.equalTo = function(res)
    {
        return this.id == res.id;
    }
    this.getPrice = () => {
        let sum = 0;
        this.bags.forEach(bag => sum += bag.getPrice())
        return sum;
    }
    this.getID = () => this.id;
    this.getCreatedAt = () => this.created_at;
    this.setStatus = () => this.status = status;
    this.getAllEstablishments = () => {
        const establishments = new Set();
        this.bags.forEach(bag => establishments.add(bag.getEstablishment()))
        return establishments
    }
    this.addBag = (bagToAdd) => {
        if(bagToAdd.getDeadline().isAfter(dayjs())
            && 
           !this.bags.some(item => item.equalTo(bagToAdd))
           &&
           !this.bags.some(item => item.getEstablishment().equalTo(item.getEstablishment()))
           &&
           this.bags.isAvailable()
        )
        {
            console.log("Bag added by addBag");
            this.bags.push(bagToAdd);
        }
    }
    this.removeBagById = (id) => {
        const index = this.bags.findIndex(bag => bag.getId() == id);

        if(index != -1)
        {
            console.log("Bag removed from the reservation.");
            return this.bags.splice(index,1);
        }
        console.log("Bag NOT found by removeBagByIndex");
        return false;
    } 

    this.cancel = () => {
        this.bags.forEach(bag => bag.release())
        this.status = "cancelled"

        console.log("Reservation cancelled by cancel");
        return true
    }

    this.display = function() {
        console.log(`Reservation ID: ${this.id}`);
        this.user.display();
        console.log(`Timestamp: ${this.created_at}`);
        console.log(`Status: ${this.status}`);
        console.log(`Bags:`);
        this.bags.forEach(bag => bag.display());
    }
   

}
export default Reservation;