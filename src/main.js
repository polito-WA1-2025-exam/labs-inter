"use strict";
const dayjs = require("dayjs")

function ShoppingCart(id, reservations=[], user)
{
    this.id = id;
    this.reservations = reservations;
    this.user = user;
    this.allergies = [];
    this.special_requests = special_requests;

    //TO DO: problem to resolve -> how to check if all bags of all reservations on the same day have a bag with the same establishment of the reservation that we want to add
    this.addReservation = (reservation) => {
        if(
            !this.reservations.some(res => res.equalTo(reservation))
            &&
            this.reservations.some(res => res.getCreatedAt().isSame(reservation.getCreatedAt()) && res.bags.some(item => item.getEstablishment().equalTo(reservation)))
        )
        {
            this.reservations.push(reservation)
        }
    }

}
