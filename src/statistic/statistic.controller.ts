import { Controller, Get, HttpStatus, Inject, Query } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserBookingCount } from './vo/UserBookingCount.vo';
import { MeetingRoomUsedCount } from "./vo/MeetingRoomUsedCount";

@ApiTags('统计')
@Controller('statistic')
export class StatisticController {
  @Inject(StatisticService)
  private statisticService: StatisticService;

  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserBookingCount,
  })
  @Get('userBookingCount')
  async userBookingCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.userBookingCount(startTime, endTime);
  }

  @ApiQuery({
    name: 'startTime',
    type: String,
    description: '开始时间',
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    description: '结束时间',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MeetingRoomUsedCount,
  })
  @Get('meetingRoomUsedCount')
  async meetingRoomUsedCount(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.statisticService.meetingRoomUsedCount(startTime, endTime);
  }
}
