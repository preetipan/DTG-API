import { PartialType } from '@nestjs/mapped-types';
import { CreateSubRoundDto } from './create-sub-round.dto';

export class UpdateSubRoundDto extends PartialType(CreateSubRoundDto) {}
