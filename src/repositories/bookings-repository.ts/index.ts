import { prisma } from "@/config";

async function postBooking(roomId: number, userId: number) {
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

const bookingsRepository = {
  postBooking,
  checkVacancy,
  checkBooking
};

export default bookingsRepository;
