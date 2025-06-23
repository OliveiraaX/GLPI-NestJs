import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsIn,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsString()
  @IsDefined({ message: 'O campo name é obrigatório.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsDefined({ message: 'O campo content é obrigatório.' })
  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @IsDefined({ message: 'O campo atribuir é obrigatório.' })
  @IsNumber()
  atribuir: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  users_id_recipient?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  entities_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2, 3, 4, 5, 6])
  status?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2])
  type?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2])
  requesttypes_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2, 3])
  urgency?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2, 3])
  impact?: number;

  @IsOptional()
  @Type(() => Number)
  @IsIn([1, 2, 3, 4, 5])
  priority?: number;
}

export class UpdateStatusDto {
  @Type(() => Number)
  @IsIn([1, 2, 3, 4, 5, 6], {
    message: 'O status deve ser um número entre 1 e 6.',
  })
  @Type(() => Number)
  @IsDefined({ message: 'O campo status é obrigatório.' })
  @IsNotEmpty()
  status: number;

  @Type(() => Number)
  @IsDefined({ message: 'O campo id é obrigatório.' })
  @IsNotEmpty()
  id: number;
}
