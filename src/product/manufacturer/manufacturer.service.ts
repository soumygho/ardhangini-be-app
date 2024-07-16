import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createManufacturerDto: CreateManufacturerDto) {
    let manufacturer: ManufacturerEntity = new ManufacturerEntity();
    Object.assign(manufacturer, createManufacturerDto);
    manufacturer = await this.manufacturerRepository.create(manufacturer);
    return await this.manufacturerRepository.save(manufacturer);
  }

  async findAll() {
    return await this.manufacturerRepository.find();
  }

  async findOne(id: string) {
    return await this.manufacturerRepository.findOne({ where: [{ id: id }] });
  }

  async findByName(name: string) {
    return await this.dataSource
      .getRepository(ManufacturerEntity)
      .createQueryBuilder('manufacturer')
      .where('manufacturer.name = :name', { name })
      .getOne();
  }

  async update(id: string, updateManufacturerDto: UpdateManufacturerDto) {
    const existingManufacturer: ManufacturerEntity = await this.findOne(id);
    if (existingManufacturer === undefined) {
      throw new NotFoundException(`Manufacturer with id ${id} not found.`);
    }
    Object.assign(existingManufacturer, updateManufacturerDto);
    existingManufacturer.id = id;
    return await this.manufacturerRepository.save(existingManufacturer);
  }

  async remove(id: string) {
    return await this.manufacturerRepository.delete(id);
  }
}
