import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from 'src/entities/group.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get('all')
  async findAll() {
    return this.groupService.findAll();
  }

  @Get('detail/:idGroup')
  async findOne(@Param('idGroup') idGroup: string) {
    return this.groupService.findOne(idGroup); // หากไม่พบ, groupService จะโยน NotFoundException ให้
  }

  @Get('name/:groupName')
  async findByName(@Param('groupName') groupName: string) {
    const group = await this.groupService.findByName(groupName);
    if (!group) {
      throw new NotFoundException(`Group with name '${groupName}' not found`);
    }
    return group;
  }

  @Get(':groupId/main-round')
  async getMainRound(@Param('groupId') groupId: string) {
    return this.groupService.getMainRound(groupId);
  }


  @Get(':groupId/sub-round')
  async getSubRound(@Param('groupId') groupId: string) {
    return this.groupService.getSubRound(groupId);
  }

  @Get('checkSubGroup/:subGroup')
  async checkSubGroup(@Param('subGroup') subGroup: string) {
    const exists = await this.groupService.checkSubGroupExists(subGroup);
    return { exists };
  }

  @Patch(':idGroup')
  async update(
    @Param('idGroup') idGroup: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(idGroup, updateGroupDto);
  }

  @Patch('subGroup/:groupName')
  async updateByGroupName(
    @Param('groupName') groupName: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateByGroupName(groupName, updateGroupDto);
  }

  @Patch(':groupId/increment-main-round')
  async incrementMainRoundNumber(
    @Param('groupId') groupId: string,
  ): Promise<Group> {
    return await this.groupService.incrementMainRoundNumber(groupId);
  }

  @Patch(':groupId/reset-main-round')
  async resetMainRoundNumber(
    @Param('groupId') groupId: string,
  ): Promise<Group> {
    return await this.groupService.resetMainRoundNumber(groupId);
  }

  @Patch(':groupId/increment-sub-round')
  async incrementSubRoundCount(
    @Param('groupId') groupId: string,
  ): Promise<Group> {
    return await this.groupService.incrementSubRoundCount(groupId);
  }

  @Patch(':groupId/reset-sub-round')
  async resetSubRoundCount(@Param('groupId') groupId: string): Promise<Group> {
    return await this.groupService.resetSubRoundCount(groupId);
  }

  @Delete(':idGroup')
  async remove(@Param('idGroup') idGroup: string) {
    await this.groupService.remove(idGroup);
    return { message: `Group with ID ${idGroup} deleted successfully` };
  }
}
