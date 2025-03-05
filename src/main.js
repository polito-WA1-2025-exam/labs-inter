"use strict";
const dayjs = require("dayjs")

function User(id,name)
{
    this.id=id;
    this.name = name;

    this.display = () => {
        console.log(`User Id: ${this.id}`);
        console.log(`User Name: ${this.name}`);
    }
}

function Food(id,name,quantity)
{
    this.id=id;
    this.name = name;
    this.quantity = quantity;
    this.display = () => {
        console.log(`(Quantity x Name) ${item.quantity}x${item.name}`)
    }
}

function Bag(id, type, price, size, status, start_date, end_date, establishment={}, foods=[])
{
    this.id = id;
    this.type = type;
    this.price = price;
    this.size = size;
    this.status = status;
    this.start_date = start_date;
    this.end_date = end_date;
    this.establishment = establishment;
    this.foods = foods;

    this.addFood = function(food)
    {
        this.foods.push(food)
    }
    this.isAvailable = () => this.status == "available"
    
    this.equalTo = function(bag)
    {
        return this.id == bag.id
    }

    this.setEstablishment = function(est)
    {
        this.establishment = est
    }

    this.getDeadline = () => this.end_date;
    this.getEstablishment = () => this.establishment

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
        return this.id == res.id
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
            this.bags.push(bagToAdd)
        }
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