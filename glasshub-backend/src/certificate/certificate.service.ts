import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async create(certificate: CreateCertificateDto): Promise<Certificate> {
    try {
      const newCertificate =
        await this.certificateRepository.create(certificate);
      return await this.certificateRepository.save(newCertificate);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<Certificate> {
    try {
      const certificate = await this.certificateRepository.findOne({
        where: { id },
      });
      if (!certificate) {
        throw new NotFoundException(`Certificate with ID ${id} not found.`);
      }
      return certificate;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(limit: number, offset: number): Promise<Certificate[]> {
    try {
      return await this.certificateRepository.find({
        skip: +offset,
        take: +limit,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
