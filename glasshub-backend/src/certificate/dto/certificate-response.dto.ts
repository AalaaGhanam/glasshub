import { ApiProperty } from '@nestjs/swagger';

export class CertificateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  companyName: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  issueDate: Date;
}
