import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  users_id_recipient?: number;

  @IsNumber()
  @IsOptional()
  entities_id?: number;

  @IsIn([1, 2, 3, 4, 5, 6])
  @IsOptional()
  status?: number;

  @IsIn([1, 2])
  @IsOptional()
  type?: number;

  @IsIn([1, 2])
  @IsOptional()
  requesttypes_id?: number;

  @IsIn([1, 2, 3])
  @IsOptional()
  urgency?: number;

  @IsIn([1, 2, 3])
  @IsOptional()
  impact?: number;

  @IsIn([1, 2, 3, 4, 5])
  @IsOptional()
  priority?: number;

  @IsNumber()
  @IsNotEmpty()
  atribuir: number;
}
