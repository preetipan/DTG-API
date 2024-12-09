import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

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

  @Delete(':idGroup')
  async remove(@Param('idGroup') idGroup: string) {
    await this.groupService.remove(idGroup);
    return { message: `Group with ID ${idGroup} deleted successfully` };
  }
}
