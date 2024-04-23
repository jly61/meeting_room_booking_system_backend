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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingRoomListVo = void 0;
const swagger_1 = require("@nestjs/swagger");
const meeting_room_vo_1 = require("./meeting-room.vo");
class MeetingRoomListVo {
}
exports.MeetingRoomListVo = MeetingRoomListVo;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [meeting_room_vo_1.MeetingRoomVo],
    }),
    __metadata("design:type", Array)
], MeetingRoomListVo.prototype, "users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MeetingRoomListVo.prototype, "totalCount", void 0);
//# sourceMappingURL=meeting-room-list.vo.js.map