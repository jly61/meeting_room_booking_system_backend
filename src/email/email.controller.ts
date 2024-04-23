import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  // @Post()
  // create(@Body() createEmailDto: CreateEmailDto) {
  //   return this.emailService.create(createEmailDto);
  // }
}
