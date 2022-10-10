//liskov's principle
// If you have a function, that works for a base type, it should work for a derived type
//https://duncan-mcardle.medium.com/solid-principle-3-liskov-substitution-javascript-fdb6af8ee1ea
class Rectangle {
    constructor(width, height) {
        this._width = width
        this._height = height
    }

    get width() {
        return this._width
    }
    get height() {
        return this._height
    }

    set width(value) {
        this._width = value
    }
    set height(value) {
        this._height = value
    }

    getArea() {
        return this._width * this._height
    }
}

class Square extends Rectangle {
    constructor(size) {
        super(size, size)
    }
}

const square = new Square(2)
square.width = 3
console.log(square.getArea())



// correct one
class Square extends Rectangle {
    constructor(size) {
        super(size, size)
    }

    set width(value) {
        this._width = this._height = value
    }

    set height(value) {
        this._width = this._height = value
    }
}


//another approach to correct it

class Shape {
    get area() {
        return 0;
    }
}
class Rectangle extends Shape {
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
    get area() {
        return this.length * this.width;
    }
}
class Square extends Shape {
    constructor(length) {
        super();
        this.length = length;
    }
    get area() {
        return this.length ** 2;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    get area() {
        return Math.PI * (this.radius ** 2);
    }
}
const shapes = [
    new Rectangle(1, 2),
    new Square(1, 2),
    new Circle(2),
]
for (let s of shapes) {
    console.log(s.area);
}





// single responsibility principle
class TodoList {
    constructor() {
        this.items = []
    }

    addItem(text) {
        this.items.push(text)
    }

    removeItem(index) {
        this.items = items.splice(index, 1)
    }

    toString() {
        return this.items.toString()
    }

    save(filename) {
        fs.writeFileSync(filename, this.toString())
    }

    load(filename) {
        // Some implementation
    }
}


// correct one
class TodoList {
    constructor() {
        this.items = []
    }

    addItem(text) {
        this.items.push(text)
    }

    removeItem(index) {
        this.items = items.splice(index, 1)
    }

    toString() {
        return this.items.toString()
    }
}

class DatabaseManager {
    saveToFile(data, filename) {
        fs.writeFileSync(filename, data.toString())
    }

    loadFromFile(filename) {
        // Some implementation
    }
}



//open close principle


class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

const standardVehicle = new Vehicle(10, 15);

console.log(standardVehicle.getRange()); // Outputs '150'





class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        let range = this.fuelCapacity * this.fuelEfficiency;

        if (this instanceof HybridVehicle) {
            range += this.electricRange;
        }
        return range;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }
}

const standardVehicle = new Vehicle(10, 15);
const hybridVehicle = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'

// correct one

class Vehicle {
    constructor(fuelCapacity, fuelEfficiency) {
        this.fuelCapacity = fuelCapacity;
        this.fuelEfficiency = fuelEfficiency;
    }

    getRange() {
        return this.fuelCapacity * this.fuelEfficiency;
    }
}

class HybridVehicle extends Vehicle {
    constructor(fuelCapacity, fuelEfficiency, electricRange) {
        super(fuelCapacity, fuelEfficiency);
        this.electricRange = electricRange;
    }

    getRange() {
        return (this.fuelCapacity * this.fuelEfficiency) + this.electricRange;
    }
}

const standardVehicle = new Vehicle(10, 15);
const hybridVehicle = new HybridVehicle(10, 15, 50);

console.log(standardVehicle.getRange()); // Outputs '150'
console.log(hybridVehicle.getRange()); // Outputs '200'




// interface segregation principle


class Phone {
    constructor() {
        if (this.constructor.name === 'Phone')
            throw new Error('Phone class is absctract')
    }

    call(number) {}

    takePhoto() {}

    connectToWifi() {}
}


class IPhone extends Phone {
    call(number) {
        // Implementation
    }

    takePhoto() {
        // Implementation
    }

    connectToWifi() {
        // Implementation
    }
}

class Nokia3310 extends Phone {
    call(number) {
        // Implementation
    }

    takePhoto() {
        // Argh, I don't have a camera
    }

    connectToWifi() {
        // Argh, I don't know what wifi is
    }
}


// dependency inversion


class PurchaseHandler {
    processPayment(paymentDetails, amount) {
        // Complicated, PayPal specific logic goes here
        const paymentSuccess = PayPal.requestPayment(paymentDetails, amount);

        if (paymentSuccess) {
            // Do something
            return true;
        }

        // Do something
        return false;
    }
}


// The problem here is that if we change from PayPal to Square (another payment processor) in 6 months time, this code breaks. We need to go back and swap out our PayPal API calls for Square API calls. But in addition, what if the Square API wants different types of data? Or perhaps it wants us to “stage” a payment first, and then to process it once staging has completed?
//
//     That’s bad, and so we need to abstract the functionality out instead.
//correct one
class PurchaseHandler {
    processPayment(paymentDetails, amount) {
        const paymentSuccess = PaymentHandler.requestPayment(
            paymentDetails,
            amount
        );

        if (paymentSuccess) {
            // Do something
            return true;
        }

        // Do something
        return false;
    }
}

class PaymentHandler {
    requestPayment(paymentDetails, amount) {
        // Complicated, PayPal specific logic goes here
        return PayPal.requestPayment(paymentDetails, amount);
    }
}




