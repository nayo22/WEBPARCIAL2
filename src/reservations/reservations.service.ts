import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { ReservationRulesService } from './reservation-rules.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,
    private readonly reservationRulesService: ReservationRulesService,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
  }

  async findOne(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['room'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async cancel(id: number): Promise<ReservationEntity> {
    const reservation = await this.findOne(id);
    this.reservationRulesService.ensureCanCancel(reservation);
    reservation.status = 'cancelled';
    return this.reservationRepository.save(reservation);
  }
}