import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
export declare class MeetingRoomController {
    private readonly meetingRoomService;
    constructor(meetingRoomService: MeetingRoomService);
    list(pageNumber: number, pageSize: number, name: string, capacity: number, equipment: string, location: string): Promise<{
        list: import("./entities/meeting-room.entity").MeetingRoom[];
        total: number;
    }>;
    create(meetingRoom: CreateMeetingRoomDto): Promise<import("typeorm").InsertResult>;
    update(meetingRoom: UpdateMeetingRoomDto): Promise<string>;
    findOne(id: number): Promise<import("./entities/meeting-room.entity").MeetingRoom>;
    delete(id: number): Promise<string>;
}
