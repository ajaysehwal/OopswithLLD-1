class Building {
  constructor(name, floors) {
    this.name = name;
    this.floorNumber = floors;
    this.parkingfloors = [];
    for (let i = 1; i <= floors; i++) {
      this.parkingfloors.push(new ParkingFloors(i, 3));
    }
  }
}

class ParkingFloors {
  constructor(floorsNumber, numParkingSpots) {
    this.floorsNumber = floorsNumber;
    this.parkingspot = [];
    for (let i = 1; i <= numParkingSpots; i++) {
      this.parkingspot.push(new ParkingSpots(i, this));
    }
  }
}

class ParkingSpots {
  constructor(id, parkingFloor) {
    this.id = id;
    this.isOccupied = false;
    this.occupiedBy = null;
    this.parkingFloor = parkingFloor;
  }

  park(car) {
    this.isOccupied = true;
    this.occupiedBy = car;
  }

  leavespot() {
    this.isOccupied = false;
    this.occupiedBy = null;
  }

  getDetails() {
    return {
      id: this.id,
      floor: this.parkingFloor.floorsNumber,
      isOccupied: this.isOccupied,
      occupiedBy: this.occupiedBy,
    };
  }
}

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDetails() {
    return {
      name: this.name,
      email: this.email,
    };
  }
}

class Reservation {
  constructor(user, parkingSpot, startTime, endTime) {
    this.user = user;
    this.parkingSpot = parkingSpot;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getDetails() {
    return {
      user: this.user.getDetails(),
      parkingSpot: this.parkingSpot.getDetails(),
      startTime: this.startTime,
      endTime: this.endTime,
    };
  }
}

class CarParkingBookingSystem {
  constructor(CarSpot) {
    this.CarSpot = CarSpot;
    this.reservation = [];
  }

  makereservations(user, starttime, endtime) {
    for (const ParkingFloor of this.CarSpot.parkingfloors) {
      const availability = ParkingFloor.parkingspot.find((spot) => !spot.isOccupied);
      if (availability) {
        const reservation = new Reservation(user, availability, starttime, endtime);
        availability.park(reservation);
        this.reservation.push(reservation);
        return reservation;
      }
    }
    return null; // No available parking spot
  }

  cancelReservation(reservation) {
    reservation.parkingSpot.leavespot();
    this.reservation = this.reservation.filter((res) => res !== reservation);
  }
}

const CreatingBuilding = new Building('main', 10);
const user1 = new User('test1', 'ajay@example.com');
const user2 = new User('test1', 'test1@example.com');

const system = new CarParkingBookingSystem(CreatingBuilding);

// Make reservations
const Booking = system.makereservations(user1, "18928", "8329821");
const Booking2 = system.makereservations(user2, "18928", "8329821");

console.log(Booking.getDetails());
console.log(Booking2.getDetails());
