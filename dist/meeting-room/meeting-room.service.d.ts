import { MeetingRoom } from './entities/meeting-room.entity';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
export declare class MeetingRoomService {
    private repository;
    initData(): Promise<void>;
    find(pageNumber: number, pageSize: number, name: string, capacity: number, equipment: string, location: string): Promise<{
        list: MeetingRoom[];
        total: number;
    }>;
    create(meetingRoom: CreateMeetingRoomDto): Promise<import("typeorm").InsertResult>;
    update(meetingRoomDto: UpdateMeetingRoomDto): Promise<string>;
    findById(id: number): Promise<MeetingRoom>;
    delete(id: number): Promise<string>;
}
