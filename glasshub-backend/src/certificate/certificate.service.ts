import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async create(certificate: CreateCertificateDto): Promise<Certificate> {
    const { logo, ...rest } = certificate;

    try {
      const base64Data = logo.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `logo-${Date.now()}.png`;
      const uploadsDir = join(__dirname, '..', '..', 'uploads');
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }

      const filePath = join(uploadsDir, fileName);
      writeFileSync(filePath, buffer);
      const newCertificate = this.certificateRepository.create({
        ...rest,
        logo: fileName,
      });
      return this.certificateRepository.save(newCertificate);
    } catch (error) {
      console.error('Error saving certificate:', error);
      throw new Error('Failed to save certificate');
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
