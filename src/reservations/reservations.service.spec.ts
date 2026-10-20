import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { ReservationRulesService } from './reservation-rules.service';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: Repository<ReservationEntity>;
  let rulesService: ReservationRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(ReservationEntity),
          useClass: Repository,
        },
        {
          provide: ReservationRulesService,
          useValue: {
            ensureCanCancel: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<Repository<ReservationEntity>>(
      getRepositoryToken(ReservationEntity),
    );
    rulesService = module.get<ReservationRulesService>(ReservationRulesService);
  });

  it('should cancel and save reservation when rules pass', async () => {
    const reservation = { id: 1, status: 'active' } as any;
    jest.spyOn(service, 'findOne').mockResolvedValue(reservation);
    jest.spyOn(rulesService, 'ensureCanCancel').mockReturnValue(undefined);
    jest.spyOn(repository, 'save').mockResolvedValue({ ...reservation, status: 'cancelled' });

    const result = await service.cancel(1);
    expect(rulesService.ensureCanCancel).toHaveBeenCalledWith(reservation);
    expect(reservation.status).toBe('cancelled');
    expect(repository.save).toHaveBeenCalledWith(reservation);
    expect(result.status).toBe('cancelled');
  });

  it('should not modify or save if rules service throws exception', async () => {
    const reservation = { id: 1, status: 'active' } as any;
    jest.spyOn(service, 'findOne').mockResolvedValue(reservation);
    jest.spyOn(rulesService, 'ensureCanCancel').mockImplementation(() => {
      throw new ConflictException();
    });
    const saveSpy = jest.spyOn(repository, 'save');

    await expect(service.cancel(1)).rejects.toThrow(ConflictException);
    expect(reservation.status).toBe('active');
    expect(saveSpy).not.toHaveBeenCalled();
  });
});