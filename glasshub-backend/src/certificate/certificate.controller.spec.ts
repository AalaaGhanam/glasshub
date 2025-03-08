import { Test, TestingModule } from '@nestjs/testing';
import { CertificateController } from './certificate.controller';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { CertificateResponseDto } from './dto/certificate-response.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('CertificateController', () => {
  let controller: CertificateController;
  let service: CertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificateController],
      providers: [
        {
          provide: CertificateService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CertificateController>(CertificateController);
    service = module.get<CertificateService>(CertificateService);
    (controller as any).validateApiKey = jest
      .fn()
      .mockImplementation((apiKey: string) => {
        return apiKey === 'api-key';
      });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createCertificateDto: CreateCertificateDto = {
      companyName: 'GlassHub',
      logo: 'logo.png',
      content: '<html>Certificate Content</html>',
      issueDate: '2025-10-01',
    };

    const certificateResponse: CertificateResponseDto = {
      id: 1,
      companyName: 'Test',
      logo: 'Test.png',
      content: '<html>Certificate Content</html>',
      issueDate: new Date('2025-10-01'),
    };

    it('should create a certificate', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(certificateResponse);

      const result = await controller.create(createCertificateDto);
      expect(result).toEqual(certificateResponse);
      expect(service.create).toHaveBeenCalledWith(createCertificateDto);
    });

    it('should throw UnauthorizedException', async () => {
      await expect(controller.create(createCertificateDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findOne', () => {
    const certificateResponse: CertificateResponseDto = {
      id: 1,
      companyName: 'Test',
      logo: 'Test.png',
      content: '<html>Certificate Content</html>',
      issueDate: new Date('2025-10-01'),
    };

    it('should return a certificate', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(certificateResponse);

      const result = await controller.findOne('1');
      expect(result).toEqual(certificateResponse);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw UnauthorizedException', async () => {
      await expect(controller.findOne('1')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('findAll', () => {
    const certificatesResponse: CertificateResponseDto[] = [
      {
        id: 1,
        companyName: 'Test',
        logo: 'Test.png',
        content: '<html>Certificate Content</html>',
        issueDate: new Date('2025-10-01'),
      },
      {
        id: 2,
        companyName: 'example',
        logo: 'logo.png',
        content: '<html>Certificate</html>',
        issueDate: new Date('2025-10-02'),
      },
    ];

    it('should return a list of certificates', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(certificatesResponse);

      const result = await controller.findAll('10', '0');
      expect(result).toEqual(certificatesResponse);
      expect(service.findAll).toHaveBeenCalledWith(10, 0);
    });

    it('should throw UnauthorizedException', async () => {
      await expect(controller.findAll('10', '0')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
