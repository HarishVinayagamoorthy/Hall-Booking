import uniqid from "uniqid";

// controllers/roomController.js
const rooms = [];
const bookings = [];

// Get AlL Rooms

const  getAllRooms =(req,res) => {
    try {
       const TotalRooms =rooms.length
        res.json({message:"Get All Rooms Successfully", TotalRooms,rooms})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });
    }
}

// Create a Room
const createRoom = (req, res) => {
    const { roomName, seats, amenities, pricePerHour, } = req.body;

    try {
        if (!roomName || !seats || !amenities || !pricePerHour) {
            res.status(400).send({ message: "Some Input Field is missing" })
        }
        else {
            const room = { roomName, seats, amenities, pricePerHour, isBooked: false, roomId: uniqid() };
            rooms.push(room);
            res.json({ message: 'Room created successfully', room });
        };


    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });

    }

}



// Book a Room
const bookRoom = (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    try {

        if (!customerName ||!date || !startTime ||!endTime||!roomId )
        {
            res.status(400).send({ message: "Some Input Field is missing" })
        }
        else{
            const room = rooms.find(r => r.roomId === roomId);

            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
        
            if (room.isBooked) {
                return res.status(400).json({ message: 'Room is already booked for the selected time' });
            }
        
            const booking = { customerName, date, startTime, endTime, roomId };
            bookings.push(booking);
        
            // Mark the room as booked
            room.isBooked = true;
        
            res.json({ message: 'Room booked successfully', booking });
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });
    }

}

  


// List all Rooms with Booked Data

const listRooms = (req, res) => {

    try {
        const roomData = rooms.map(room => {
            const booking = bookings.find(b => b.roomId === room.roomId);
            return {
                roomName: room.roomName,
                bookedStatus: room.isBooked ? 'Booked' : 'Available',
                customerName: booking ? booking.customerName : '',
                date: booking ? booking.date : '',
                startTime: booking ? booking.startTime : '',
                endTime: booking ? booking.endTime : '',
            };
        });
        res.json(roomData);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });
    }
    
};


// List all customers with booked Data


const listCustomers = (req, res) => {
    try {
        const customerData = bookings.map(booking => {
            const room = rooms.find(r => r.roomId === booking.roomId);
            return {
                customerName: booking.customerName,
                roomName: room ? room.roomName : 'Room not found',
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
            };
        });
        res.json(customerData);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });
    }
    
};


// List how many times a customer has booked the room

const customerBookingHistory = (req, res) => {
    const { customerName } = req.params;
    try {
        if (!customerName)
        {
            res.status(400).send({ message: "Some Input Field is missing" })
        }
        else
        {
             const customerBookings = bookings.filter(b => b.customerName === customerName);

    const bookingHistory = customerBookings.map(booking => {
        const room = rooms.find(r => r.roomId === booking.roomId);
        return {
            customerName: booking.customerName,
            roomName: room ? room.roomName : 'Room not found',
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            bookingId: booking.bookingId,
            bookingDate: booking.bookingDate,
            bookingStatus: booking.bookingStatus,
        };
    });

    res.json(bookingHistory);
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: "error occuried:", error });
    }
   
   
};



export default {
    getAllRooms,
    createRoom,
    bookRoom,
    listRooms,
    listCustomers,
    customerBookingHistory,
}