import { User } from '../../user/entities/user.entity';
import { MeetingRoom } from '../../meeting-room/entities/meeting-room.entity';
export declare class Booking {
    id: number;
    startTime: Date;
    endTime: Date;
    status: string;
    note: string;
    user: User;
    room: MeetingRoom;
    createTime: Date;
    updateTime: Date;
}
