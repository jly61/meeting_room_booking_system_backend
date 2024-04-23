import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    list(pageNumber: number, pageSize: number, username: string, meetingRoomName: string, position: string, startTime: string, endTime: string): Promise<{
        bookings: import("./entities/booking.entity").Booking[];
        count: number;
    }>;
    add(bookingDto: CreateBookingDto, userId: number): Promise<string>;
    apply(id: number): Promise<string>;
    reject(id: number): Promise<string>;
    unbind(id: number): Promise<string>;
    urge(id: number): Promise<string>;
}
