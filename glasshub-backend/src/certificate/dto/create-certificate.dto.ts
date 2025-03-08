import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateCertificateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'GlassHub',
    description: 'Company Name',
  })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '/logo.png',
    description: 'Company Logo',
  })
  logo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '<html><body><h1>Certificate of Completion</h1></body></html>',
    description: 'Certificate HTML content',
  })
  content: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2025-10-01T00:00:00.000Z',
    description: 'Certificate Issue Date',
  })
  issueDate: string;
}
