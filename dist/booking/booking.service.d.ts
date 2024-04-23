import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';
export declare class BookingService {
    private entityManage;
    private redisService;
    private emailService;
    initData(): Promise<void>;
    findList(pageNumber: number, pageSize: number, username: string, meetingRoomName: string, position: string, startTime: string, endTime: string): Promise<{
        bookings: Booking[];
        count: number;
    }>;
    add(bookingDto: CreateBookingDto, userId: number): Promise<void>;
    apply(id: number): Promise<string>;
    reject(id: number): Promise<string>;
    unbind(id: number): Promise<string>;
    urge(id: number): Promise<string>;
}
