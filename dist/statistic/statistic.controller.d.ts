export declare class StatisticController {
    private statisticService;
    userBookingCount(startTime: string, endTime: string): Promise<any[]>;
    meetingRoomUsedCount(startTime: string, endTime: string): Promise<any[]>;
}
