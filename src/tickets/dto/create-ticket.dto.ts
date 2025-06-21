import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  users_id_recipient: number;

  @IsNumber()
  @IsOptional()
  entities_id?: number;

  @IsNumber()
  @IsOptional()
  status?: number;

  @IsNumber()
  @IsOptional()
  type?: number;

  @IsNumber()
  @IsOptional()
  requesttypes_id?: number;

  @IsNumber()
  @IsOptional()
  urgency?: number;

  @IsNumber()
  @IsOptional()
  impact?: number;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsNumber()
  @IsOptional()
  user_id?: number; // técnico atribuído (opcional)
}
