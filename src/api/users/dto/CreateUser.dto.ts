import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateUserDto {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly phone: string;
}
