import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationRulesService } from './reservation-rules.service';
import { ReservationEntity } from './entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRulesService],
})
export class ReservationsModule {}