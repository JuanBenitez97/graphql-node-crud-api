const Booking = require("../../models/booking");
const Event = require("../../models/event");
const { transformBooking } = require("./merge");


module.exports = {
  bookings: (req) => {
    if (!req.isAuth){
      throw new Error("Unathenticated");
    }
    return Booking.find()
      .then(bookings => {
        return bookings.map(booking => {
          return transformBooking(booking);
        });
      })
      .catch(err => {
        throw err;
      });
  },
  bookEvent: (args, req) => {
    if (!req.isAuth){
      throw new Error("Unathenticated");
    }
    return Event.findById(args.eventId)
      .then(event => {
        const booking = new Booking({
          user: "5cb9dbdc6947e1001fb21d6a",
          event: event
        });
        return booking.save();
      })
      .then(booking => {
        return transformBooking(booking);
      })
      .catch(err => {
        throw err;
      });
  },
  cancelBooking: (args, req) => {
    if (!req.isAuth){
      throw new Error("Unathenticated");
    }
    let eventBooking;
    return Booking.findById(args.bookingId)
      .populate("event")
      .then(booking => {
        eventBooking = transformEvent(booking.event);
        return Booking.deleteOne({ _id: args.bookingId });
      })
      .then(result => {
        return eventBooking;
      })
      .catch(err => {
        throw err;
      });
  }
};
