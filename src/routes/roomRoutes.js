// routes/roomRoutes.js
import express from 'express';
import  roomController from '../Controllers/roomController.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send(` <h1>Welcome to Backend of Hall Booking project</h1>`);
});
router.get("/getAllRooms", roomController.getAllRooms);
router.post('/createRoom', roomController.createRoom);
router.post('/bookRoom', roomController.bookRoom);
router.get('/listRooms', roomController.listRooms);
router.get('/listCustomers', roomController.listCustomers);
router.get('/customerBookingHistory/:customerName', roomController.customerBookingHistory);

export default router;
