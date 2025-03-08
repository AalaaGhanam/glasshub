import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateService } from './certificate.service';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';

describe('CertificateService', () => {
  let service: CertificateService;
  let repository: Repository<Certificate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertificateService,
        {
          provide: getRepositoryToken(Certificate),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CertificateService>(CertificateService);
    repository = module.get<Repository<Certificate>>(
      getRepositoryToken(Certificate),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createCertificateDto: CreateCertificateDto = {
      companyName: 'GlassHub',
      logo: 'logo.png',
      content: '<html>Certificate Content</html>',
      issueDate: '2025-10-01',
    };

    const certificate: Certificate = {
      id: 1,
      companyName: 'Test',
      logo: 'Test.png',
      content: '<html>Certificate Content</html>',
      issueDate: new Date('2025-10-01'),
    };

    it('should create a certificate', async () => {
      jest.spyOn(repository, 'create').mockReturnValue(certificate);
      jest.spyOn(repository, 'save').mockResolvedValue(certificate);

      const result = await service.create(createCertificateDto);
      expect(result).toEqual(certificate);
      expect(repository.create).toHaveBeenCalledWith(createCertificateDto);
      expect(repository.save).toHaveBeenCalledWith(certificate);
    });
  });

  describe('findOne', () => {
    const certificate: Certificate = {
      id: 1,
      companyName: 'Test',
      logo: 'Test.png',
      content: '<html>Certificate Content</html>',
      issueDate: new Date('2025-10-01'),
    };

    it('should find a certificate by id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(certificate);

      const result = await service.findOne(1);
      expect(result).toEqual(certificate);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('findAll', () => {
    const certificates: Certificate[] = [
      {
        id: 1,
        companyName: 'Test',
        logo: 'Test.png',
        content: '<html>Certificate Content</html>',
        issueDate: new Date('2025-10-01'),
      },
      {
        id: 2,
        companyName: 'GlassHub',
        logo: 'logo.png',
        content: '<html>Certificate Content</html>',
        issueDate: new Date('2025-10-01'),
      },
    ];

    it('should return a list of certificates', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(certificates);

      const result = await service.findAll(10, 0);
      expect(result).toEqual(certificates);
      expect(repository.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
    });

    it('should return an empty list', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      const result = await service.findAll(10, 0);
      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalledWith({ skip: 0, take: 10 });
    });
  });
});
