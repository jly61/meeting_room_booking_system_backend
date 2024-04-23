import { IsNotEmpty } from 'class-validator';
import { CreateMeetingRoomDto } from './create-meeting-room.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateMeetingRoomDto extends PartialType(CreateMeetingRoomDto) {
  @ApiProperty()
  @IsNotEmpty({
    message: 'id 不能为空',
  })
  id: number;
}
