import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  user_id?: number;

  @IsNumber()
  @IsOptional()
  urgency?: number;

  @IsNumber()
  @IsOptional()
  impact?: number;

  @IsNumber()
  @IsOptional()
  priority?: number;
}
