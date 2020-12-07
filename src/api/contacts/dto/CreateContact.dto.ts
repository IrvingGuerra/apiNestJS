import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateContactDto {
  @ApiModelProperty()
  readonly userId: string;

  @ApiModelProperty()
  readonly friendPhone: string;

  @ApiModelProperty()
  readonly friendFirstName: string;

  @ApiModelProperty()
  readonly friendLastName: string;

  @ApiModelProperty()
  bnextUser: boolean;
}
