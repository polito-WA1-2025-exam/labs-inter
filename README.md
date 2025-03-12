# Group "Inter"

## Members
- s337994 Carchia Bruno
- S344149 Cassibba Andrea

# Exercise "Rescuing Surplus Food"

# Lab Journal -> [SurplusFood](https://polito-webapp1.github.io/lab-2025/Lab00/SurplusFood.pdf)
## [Lab 2](https://polito-webapp1.github.io/lab-2025/Lab02/Lab02.pdf)

The application is structured around the following main objects and their relationships:
### Objects
#### User
- `id`
- `name`

#### Food
- `id`
- `name` : String
- `quantity` : Integer

#### Bag
- `id`
- `type`: "surprise" or "regular"
- `price` : Float
- `size` : "small", "medium", or "large"
- `status` : "available" or "reserved"
- `start_date` : Timestamp
- `end_date` : Timestamp
- `establishment` : The establishment object 
- `foods` : list of Food objects

#### Establishment
- `id`
- `name` : String
- `address` : String
- `phone_number` : String
- `food_category` : String
- `type` : "store" or "restaurant"
- `bags` : list of Bag objects

#### ShoppingCart
- `id`
- `reservations`: list of Reservation objects
- `user`: User object 
- `allergies` : list of Strings
- `special_requests` : list of Strings

#### Reservation
- `id`
- `user` : User object
- `bags` : list of Bags
- `created_at` : timestamp
- `status` : "cancelled" , "active" or "confirmed"

### Relationships
- One `establishment` has many `bags`
- One `bag` belongs to one `establishment`
- One `bag` **may** belong to one `ùser`
- One `bag` has many `foodBin`
- One `food` belongs to one `bag`
- One `ShoppingCart` has many `reservation`
- One `ShoppingCart` belongs to exactly one `user`
- One `Reservation` has many `bags`
- One `Reservation` belongs to  one `user`