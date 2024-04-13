import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common'
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import {UpdateResult} from 'typeorm'
import {AplicationsService} from '@modules/security/aplications/services/aplications.service'
import {CreateAplicationsDto} from '@modules/security/aplications/dto/create-aplications.dto'
import {UpdateAplicationsDto} from '@modules/security/aplications/dto/update-aplications.dto'

@ApiTags('aplications')
@Controller('aplications')
export class AplicationsController {
  constructor(private readonly aplicationsService: AplicationsService) {}

  @ApiOperation({summary: 'crear aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 201,
    description: 'success register',
    type: UpdateAplicationsDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body(new ValidationPipe()) profile: CreateAplicationsDto) {
    const result = await this.aplicationsService.createAplication(profile)

    return result
  }

  @ApiOperation({summary: 'Crear aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success register',
    type: UpdateResult,
  })
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @hasRoles(Role.ESTUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) profile: UpdateAplicationsDto
  ) {
    const result = await this.aplicationsService.update(id, profile)

    return result
  }

  @ApiOperation({summary: 'Eliminar aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success delete',
    type: UpdateResult,
  })
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @hasRoles(Role.ESTUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.aplicationsService.delete(id)

    return result
  }

  @ApiOperation({summary: 'crear aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success register',
    type: UpdateAplicationsDto,
  })
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @hasRoles(Role.ESTUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    const result = await this.aplicationsService.restore(id)

    return result
  }

  @ApiOperation({summary: 'crear aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success register',
    type: UpdateAplicationsDto,
  })
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @hasRoles(Role.ESTUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    const result = await this.aplicationsService.findAll()

    return result
  }

  @ApiOperation({summary: 'crear aplicaciones para asignar permisos'})
  @ApiResponse({
    status: 500,
    description: 'server error',
  })
  @ApiResponse({
    status: 200,
    description: 'success register',
    type: UpdateAplicationsDto,
  })
  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @hasRoles(Role.ESTUDENT, Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.aplicationsService.findOne(id)

    return result
  }
}
