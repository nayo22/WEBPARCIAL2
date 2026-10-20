import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  purpose!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  participants!: number;

  @IsInt()
  @Min(1)
  roomId!: number;
}