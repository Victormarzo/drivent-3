import { prisma } from "@/config";

async function postBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}
async function checkVacancy(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    },
    include: {
      Booking: true
    }
  });
}

async function checkBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    include: {
      Room: true
    }
  });
}

async function updateBooking(roomId: number, bookingId: number ) {
  return prisma.booking.update({
    
    data: {
      roomId
    },
    where: {
      id: bookingId,
    },
  });
}

const bookingsRepository = {
  postBooking,
  checkVacancy,
  checkBooking,
  updateBooking
};

export default bookingsRepository;
