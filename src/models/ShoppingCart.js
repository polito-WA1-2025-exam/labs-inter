function ShoppingCart(id, reservations=[], user, allergies=[],special_requests=[])
{
    this.id = id;
    this.reservations = reservations;
    this.user = user;
    this.allergies = allergies;
    this.special_requests = special_requests;

    this.addReservation = (reservation) => {
        if(
            !this.reservations.some(res => res.equalTo(reservation))
            &&
            !this.reservations.some(res => res.getCreatedAt().isSame(reservation.getCreatedAt()) && res.bags.some(item => reservation.bags.some( bag => bag.getEstablishment().equalTo(item.getEstablishment()))))
        )
        {
            this.reservations.push(reservation)
        }
    }

    this.removeReservation = (id) => {
        const indexOfResv = this.reservations.findIndex(reserv => reserv.equalTo({"id" : id}));
        if(indexOfResv != -1)
        {
            this.reservations.splice(indexOfResv,1);
            console.log("Reservation deleted in removeReservation")
            return true;
        }

        console.log("Reservation not found in removeReservation")
        return false;
    }

    this.confirmOrder = () => {
        if ( this.reservations.some(resv => resv.bags.some(bag => bag.isReserved() )) )
        {
            console.log("At least one bag has been reserved in confirmOrder")
            return false;
        }

        this.reservations.forEach((resv) => 
            {
                resv.setStatus("confirmed")
                resv.bags.forEach(bag => bag.reserve(this.user))
            })
    }
    this.removeFoodItemFromRegularBag = function(bagId, reservationId,foodId)
    {
        const reservation = this.reservations.filter(resv => resv.getID() == reservationId);
        const bag = reservation.bags.filter(bag => bag.getID() == bagId);

        bag.removeFood(foodId);
    }

    this.addAllergy = (allergy) => {
        this.allergies.push(allergy);
        console.log("Allergy added in addAllergy");
    }

    this.addSpecialRequest = (request) => {
        this.special_requests.push(request);
        console.log("Special Request added in addSpecialRequest");
    }
    this.totalPrice = () => {
        let sum=0;
        this.reservations.forEach(resv => sum += resv.getPrice())
        return sum;
    }


    this.display = function () {
        console.log(`\nShopping Cart ID: ${this.id}`);
        console.log(`User: ${this.user}`);
        console.log(`Allergies: ${this.allergies.join(', ') || 'None'}`);
        console.log(`Special Requests: ${this.special_requests.join(', ') || 'None'}`);
        console.log(`Total Price: $${this.totalPrice().toFixed(2)}`);
        console.log(`Reservations:`);
        this.reservations.forEach(reservation => reservation.display());
    };

}

export default ShoppingCart;