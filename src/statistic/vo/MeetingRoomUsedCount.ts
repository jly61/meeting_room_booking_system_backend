import { ApiProperty } from '@nestjs/swagger';

export class MeetingRoomUsedCount {
  @ApiProperty()
  roomId: string;

  @ApiProperty()
  meetingRoomName: string;

  @ApiProperty()
  bookingCount: string;
}
