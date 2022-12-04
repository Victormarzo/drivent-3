import bookingsRepository from "@/repositories/bookings-repository.ts";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { forbiddenError, notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";

async function preBookingCheck(roomId: number, userId: number) {
  await checkData(userId);
  await checkBooking(userId);
  const room = await hotelRepository.findRoomById(roomId);
  if (!room) {
    throw notFoundError();
  }
  
  const vacancy = await bookingsRepository.checkVacancy(roomId);
  if (vacancy.Booking.length >= vacancy.capacity )  {
    throw forbiddenError();
  }
}

async function checkBooking(userId: number) {
  const booking = await bookingsRepository.checkBooking(userId);
  if (booking) {
    throw forbiddenError();
  }
}

async function checkData(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}
async function postBooking(userId: number, roomId: number) {
  await preBookingCheck(userId, roomId);

  const booking = await bookingsRepository.postBooking(userId, roomId);
  return booking;
}

async function createBooking(userId: number) {
  await checkData(userId);
  const booking = await bookingsRepository.checkBooking(userId);
  if (!booking) {
    throw notFoundError();
  }
  const bookingResult = {
    id: booking.id,
    Room: booking.Room,
  };
  return bookingResult;
}

const bookingsService = {
  postBooking,
  createBooking
};

export default bookingsService;
