import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { generateParseIntPipe } from '../utils';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UserInfo } from '../custom.decorator';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

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
    @Query('username') username: string,
    @Query('meetingRoomName') meetingRoomName: string,
    @Query('position') position: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ) {
    return await this.bookingService.findList(
      pageNumber,
      pageSize,
      username,
      meetingRoomName,
      position,
      startTime,
      endTime,
    );
  }

  @Post('add')
  async add(
    @Body() bookingDto: CreateBookingDto,
    @UserInfo('userId') userId: number,
  ) {
    await this.bookingService.add(bookingDto, userId);
    return 'success';
  }

  @Get('apply/:id')
  async apply(@Param('id') id: number) {
    return this.bookingService.apply(id);
  }

  @Get('reject/:id')
  async reject(@Param('id') id: number) {
    return this.bookingService.reject(id);
  }

  @Get('unbind/:id')
  async unbind(@Param('id') id: number) {
    return this.bookingService.unbind(id);
  }
  @Get('urge/:id')
  async urge(@Param('id') id: number) {
    return this.bookingService.urge(id);
  }
}
