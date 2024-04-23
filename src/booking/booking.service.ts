import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  Between,
  EntityManager,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { MeetingRoom } from '../meeting-room/entities/meeting-room.entity';
import { Booking } from './entities/booking.entity';
import { RedisService } from '../redis/redis.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class BookingService {
  @InjectEntityManager()
  private entityManage: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  async initData() {
    const user1 = await this.entityManage.findOneBy(User, {
      id: 1,
    });

    const user2 = await this.entityManage.findOneBy(User, {
      id: 2,
    });

    const room1 = await this.entityManage.findOneBy(MeetingRoom, {
      id: 2,
    });

    const room2 = await this.entityManage.findOneBy(MeetingRoom, {
      id: 3,
    });

    const booking1 = new Booking();
    booking1.user = user1;
    booking1.room = room1;
    booking1.startTime = new Date();
    booking1.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManage.save(Booking, booking1);

    const booking2 = new Booking();
    booking2.user = user2;
    booking2.room = room2;
    booking2.startTime = new Date();
    booking2.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManage.save(Booking, booking2);

    const booking3 = new Booking();
    booking3.user = user1;
    booking3.room = room2;
    booking3.startTime = new Date();
    booking3.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManage.save(Booking, booking3);

    const booking4 = new Booking();
    booking4.user = user2;
    booking4.room = room1;
    booking4.startTime = new Date();
    booking4.endTime = new Date(Date.now() + 1000 * 60 * 60);

    await this.entityManage.save(Booking, booking4);
  }

  async findList(
    pageNumber: number,
    pageSize: number,
    username: string,
    meetingRoomName: string,
    position: string,
    startTime: string,
    endTime: string,
  ) {
    const skipCount = (pageNumber - 1) * pageSize;

    const condition: Record<string, any> = {};

    if (username) {
      condition.user = {
        username: Like(`%${username}%`),
      };
    }
    if (meetingRoomName) {
      condition.room = {
        name: Like(`%${meetingRoomName}%`),
      };
    }
    if (position) {
      condition.room = {
        location: Like(`%${position}%`),
      };
    }
    if (startTime && endTime) {
      condition.startTime = Between(new Date(startTime), new Date(endTime));
    }

    const [bookings, count] = await this.entityManage.findAndCount(Booking, {
      where: condition,
      relations: {
        user: true,
        room: true,
      },
      skip: skipCount,
      take: pageSize,
    });

    return {
      bookings: bookings.map((item) => {
        delete item.user.password;
        return item;
      }),
      count,
    };
  }

  async add(bookingDto: CreateBookingDto, userId: number) {
    const meetingRoom = await this.entityManage.findOneBy(MeetingRoom, {
      id: bookingDto.meetingRoomId,
    });

    if (!meetingRoom) {
      throw new BadRequestException('会议室不存在');
    }

    const user = await this.entityManage.findOneBy(User, {
      id: userId,
    });

    const booking = new Booking();
    booking.user = user;
    booking.room = meetingRoom;
    booking.startTime = new Date(bookingDto.startTime);
    booking.endTime = new Date(bookingDto.endTime);

    const res = await this.entityManage.findOneBy(Booking, {
      room: {
        id: meetingRoom.id,
      },
      startTime: LessThanOrEqual(booking.startTime),
      endTime: MoreThanOrEqual(booking.endTime),
    });

    if (res) {
      throw new BadRequestException('该时间段已被预定');
    }

    await this.entityManage.save(Booking, booking);
  }

  async apply(id: number) {
    await this.entityManage.update(
      Booking,
      {
        id,
      },
      {
        status: '审批通过',
      },
    );

    return 'success';
  }

  async reject(id: number) {
    await this.entityManage.update(
      Booking,
      {
        id,
      },
      {
        status: '审批驳回',
      },
    );

    return 'success';
  }

  async unbind(id: number) {
    await this.entityManage.update(
      Booking,
      {
        id,
      },
      {
        status: '已解除',
      },
    );

    return 'success';
  }

  async urge(id: number) {
    const flag = await this.redisService.get(`urge_${id}`);

    if (flag) {
      return '半小时内只能催办一次，请耐心等待';
    }

    let email = await this.redisService.get('admin_email');
    if (!email) {
      const admin = await this.entityManage.findOne(User, {
        select: {
          email: true,
        },
        where: {
          isAdmin: true,
        },
      });

      email = admin.email;
      await this.redisService.set('admin_email', email);
    }

    await this.emailService.sendMail({
      to: email,
      subject: '预定申请催办提醒',
      html: `id 为 ${id} 的预定申请正在等待审批`,
    });

    await this.redisService.set('urge_' + id, 1, 60 * 30);
  }
}
