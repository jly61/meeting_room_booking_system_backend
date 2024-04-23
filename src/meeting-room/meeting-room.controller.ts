import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { generateParseIntPipe } from '../utils';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequireLogin } from '../custom.decorator';
import { MeetingRoomVo } from './vo/meeting-room.vo';
import { MeetingRoomListVo } from './vo/meeting-room-list.vo';

@Controller('meeting-room')
@ApiTags('会议室管理模块')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @ApiBearerAuth()
  @ApiQuery({
    name: 'pageNumber',
    description: '第几页',
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    description: '每页多少条',
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    description: '会议室名称',
    type: Number,
  })
  @ApiQuery({
    name: 'capacity',
    description: '容量',
    type: Number,
  })
  @ApiQuery({
    name: 'equipment',
    description: '设备',
    type: Number,
  })
  @ApiQuery({
    name: 'location',
    description: '位置',
    type: Number,
  })
  @ApiResponse({
    type: MeetingRoomListVo,
  })
  @Get('list')
  async list(
    @Query(
      'pageNumber',
      new DefaultValuePipe(1),
      generateParseIntPipe('pageNumber'),
    )
    pageNumber: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('name') name: string,
    @Query('capacity') capacity: number,
    @Query('equipment') equipment: string,
    @Query('location') location: string,
  ) {
    return await this.meetingRoomService.find(
      pageNumber,
      pageSize,
      name,
      capacity,
      equipment,
      location,
    );
  }

  @ApiBearerAuth()
  @ApiBody({
    type: CreateMeetingRoomDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '会议室已存在',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MeetingRoomVo,
  })
  @Post('create')
  async create(@Body() meetingRoom: CreateMeetingRoomDto) {
    return await this.meetingRoomService.create(meetingRoom);
  }

  @ApiBearerAuth()
  @ApiBody({
    type: UpdateMeetingRoomDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '会议室不存在',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Post('update')
  async update(@Body() meetingRoom: UpdateMeetingRoomDto) {
    return await this.meetingRoomService.update(meetingRoom);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: MeetingRoomVo,
  })
  @Get('info')
  async findOne(@Query('id') id: number) {
    return await this.meetingRoomService.findById(id);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @RequireLogin()
  @Post('delete')
  async delete(@Body('id') id: number) {
    return await this.meetingRoomService.delete(id);
  }
}
