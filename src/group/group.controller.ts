import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':idGroup')  // ใช้ idGroup แทน id
  findOne(@Param('idGroup') idGroup: string) {
    return this.groupService.findOne(idGroup); // ส่ง idGroup เป็น string
  }

  @Patch(':idGroup')  // ใช้ idGroup แทน id
  update(@Param('idGroup') idGroup: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(idGroup, updateGroupDto); // ส่ง idGroup เป็น string
  }

  @Delete(':idGroup')  // ใช้ idGroup แทน id
  remove(@Param('idGroup') idGroup: string) {
    return this.groupService.remove(idGroup); // ส่ง idGroup เป็น string
  }
}
