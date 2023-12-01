// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import uniqid from "uniqid";
// dotenv.config();

// const app = express();
// app.use(express.json());
// const PORT = Number(process.env.PORT) || 3300;
// const rooms = [];
// const bookings = [];
// let date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
// let time_regex = /^(0[0-9]|1\d|2[0-3])\:(00)/;

// app.get("/", function (req, res) {
//     res.status(200).send({ message: "data fetch successfully", rooms });
// });

// // app.post("/room", (req, res) => {
// //   // const {amenities,seats,price_for_hour}=req.body;

// //   try {
// //     if (!seats || !amenities || !price_for_hour) {
// //       res.status(400).send({ message: "Some Input Field is missing" });
// //     } else {
// //       const room = {
// //         id: uniqid(),
// //         seats: req.body.seats,
// //         amenities: req.body.amenities,
// //         price_per_hour: req.body.price_pre_hour,
// //       };
// //       rooms.push(room);
// //       res.status(201).send({ message: "room created successfully", room });
// //     }
// //   } catch (error) {
// //     console.log(error)
// //     res.send({ message: "error occured", e});
// //   }
// // });

// // app.listen(PORT, () => {
// //   console.log(` APP listening to Port:${PORT}`);
// // });


// //  To CREATE  A ROOM

// app.post("/createroom", (req, res) => {
//     const { seats, amenities, price_per_hour } = req.body;

//     try {
//         if (!seats || !amenities || !price_per_hour) {
//             res.status(400).send({ message: "Some Input Field is missing" })
//         } else {
//             const room = {
//                 id: uniqid(),
//                 seats,
//                 amenities,
//                 price_per_hour,
//                 bookedstatus:"Available"
//             };
//             rooms.push(room);
//             res.status(201).send({ message: "Room created successfully",room});
//         }
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({ message: "error occuried:", error });
//     }
// });

// //  TO Booking Hall  

// app.post("/booking", (req, res) => {
//     const {room_id, CustomerName, date, StartTime, EndTime } = req.body
//     try {
//         if (!room_id ||!CustomerName || !date || !StartTime || !EndTime) {


//             res.status(400).send({ message: "Some Input Field is missing" })
//         }
//             const room = rooms.find((room)=> room.id===room_id);
//             if(!room) 
//             {
//              res.status(404).send({message:"Invaild id or Room  Not found"})
//             }

//             let status = false;
//             for(const booking of bookings){
//                 if(booking.room_id===room.id &&
//                     booking.date ===date&&
//                     !( EndTime <= booking.StartTime || StartTime >=booking.EndTime) 
//                     ){
//                         status =true;
//                         break;
//                     }
//             }
//             if(status){
//                 res.status(404).send({ error: 'Room already booked for the selected date and time' });
//             }

      
//         else {
//             const Hallbooking = {
                
//                 room_id,
//                 CustomerName,
//                 date,
//                 StartTime,
//                 EndTime,
//                 bookingDate:new Date(),
//                 bookedstatus:"Booked"

//             }
//             bookings.push(Hallbooking)
//             res.status(201).send({ message: " Hall is Booked  Successfully", Hallbooking })
//         }
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// })


// // TO GET All Hall Available Rooms and Booked Hall Data

// app.get('/HallData',(req,res)=>{
//     try {
    
//             return res.status(200).json({
//             "Available Rooms":rooms.length,
//             "Hall Booked":bookings.length,
//             ROOMS:rooms,
//             BOOKINGS:bookings,
            
//             })
        
//     } catch (error) {
//         console.log(error.message)
//         return res.status(400).send({message:error.message})
        
//     }

// })



// // List all The   customer with Booked Data 

// app.get('/BookedData',(res,req)=>{
//     try {  
//      const RoomBookings = rooms.map((room)=>{
//         const roombooking = bookings.find((booking)=>booking.room_id===room.id)
  

//         return{
//             ...room,
//             bookings:roombooking.map((booking)=>({
//                 CustomerName: booking.CustomerName,
//                 room_name: `Room ${room.id}`,
//                 date: booking.date,
//                 StartTime: booking.StartTime,
//                 EndTime: booking.EndTime,
//                 bookedstatus:booking.bookedstatus
//             })),
       
        

//         }
//      })
//      res.status(200).send({ message: "Data fetched successfully", RoomBookings });
//         console.log(res)
//     } catch (error) {
//         console.log(error.message)
//         res.status(500).send({message:error.message})
        
//     }
// })

// app.listen(PORT, () => {
//     console.log(` APP listening to Port:${PORT}`);
// }); 
// index.js


import express from 'express';
import roomRoutes from './src/routes/roomRoutes.js';
import dotenv from 'dotenv'


dotenv.config()



const app = express();
app.use(express.json());

app.use('/rooms', roomRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
