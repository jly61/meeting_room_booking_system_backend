"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const utils_1 = require("../utils");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const custom_decorator_1 = require("../custom.decorator");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async list(pageNumber, pageSize, username, meetingRoomName, position, startTime, endTime) {
        return await this.bookingService.findList(pageNumber, pageSize, username, meetingRoomName, position, startTime, endTime);
    }
    async add(bookingDto, userId) {
        await this.bookingService.add(bookingDto, userId);
        return 'success';
    }
    async apply(id) {
        return this.bookingService.apply(id);
    }
    async reject(id) {
        return this.bookingService.reject(id);
    }
    async unbind(id) {
        return this.bookingService.unbind(id);
    }
    async urge(id) {
        return this.bookingService.urge(id);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('pageNumber', new common_1.DefaultValuePipe(1), (0, utils_1.generateParseIntPipe)('pageNumber'))),
    __param(1, (0, common_1.Query)('pageSize', new common_1.DefaultValuePipe(10), (0, utils_1.generateParseIntPipe)('pageSize'))),
    __param(2, (0, common_1.Query)('username')),
    __param(3, (0, common_1.Query)('meetingRoomName')),
    __param(4, (0, common_1.Query)('position')),
    __param(5, (0, common_1.Query)('startTime')),
    __param(6, (0, common_1.Query)('endTime')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "list", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, custom_decorator_1.UserInfo)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('apply/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)('reject/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "reject", null);
__decorate([
    (0, common_1.Get)('unbind/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "unbind", null);
__decorate([
    (0, common_1.Get)('urge/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "urge", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map