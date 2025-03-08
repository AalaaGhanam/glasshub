import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiHeader,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { CertificateResponseDto } from './dto/certificate-response.dto';

@ApiTags('Certificates')
@Controller('v1/certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  @ApiOperation({ summary: 'Submit a certificate' })
  @ApiResponse({
    status: 201,
    description: 'Certificate created',
    type: CertificateResponseDto,
  })
  @ApiBody({ type: CreateCertificateDto })
  @ApiHeader({ name: 'x-api-key', description: 'API key for authentication' })
  async create(@Body() certificate: CreateCertificateDto) {
    return await this.certificateService.create(certificate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a certificate by ID' })
  @ApiResponse({
    status: 200,
    description: 'Certificate found',
    type: CertificateResponseDto,
  })
  @ApiHeader({ name: 'x-api-key', description: 'API key for authentication' })
  async findOne(@Param('id') id: string) {
    return await this.certificateService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiResponse({
    status: 200,
    description: 'Certificates found',
    type: [CertificateResponseDto],
  })
  @ApiHeader({ name: 'x-api-key', description: 'API key for authentication' })
  async findAll(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    const defaultLimit = 10;
    const defaultOffset = 0;
    const parsedLimit = isNaN(+limit) ? defaultLimit : +limit;
    const parsedOffset = isNaN(+offset) ? defaultOffset : +offset;
    return await this.certificateService.findAll(parsedLimit, parsedOffset);
  }
}
