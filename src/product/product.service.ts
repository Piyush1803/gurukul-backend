import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cake } from './entities/cake.entity';
import { Donut } from './entities/donut.entity';
import { Pastry } from './entities/pastry.entity';
import { Pudding } from './entities/pudding.entity';
import { CreateCakeDto, CreateDonutDto, CreatePastryDto, CreatePuddingDto } from './dto/create-product.dto';
import { UpdateCakeDto, UpdateDonutDto, UpdatePastryDto, UpdatePuddingDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Cake)
    private readonly cakeRepo: Repository<Cake>,
    @InjectRepository(Donut)
    private readonly donutRepo: Repository<Donut>,
    @InjectRepository(Pastry)
    private readonly pastryRepo: Repository<Pastry>,
    @InjectRepository(Pudding)
    private readonly puddingRepo: Repository<Pudding>,
  ) { }

  async create(type: string, dto: any) {
    switch (type) {
      case 'cake':
        return this.cakeRepo.save(this.cakeRepo.create(dto as CreateCakeDto));
      case 'donut':
        return this.donutRepo.save(this.donutRepo.create(dto as CreateDonutDto));
      case 'pastry':
        return this.pastryRepo.save(this.pastryRepo.create(dto as CreatePastryDto));
      case 'pudding':
        return this.puddingRepo.save(this.puddingRepo.create(dto as CreatePuddingDto));
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findAllByType(type: string) {
    switch (type) {
      case 'cake':
        return this.cakeRepo.find();
      case 'donut':
        return this.donutRepo.find();
      case 'pastry':
        return this.pastryRepo.find();
      case 'pudding':
        return this.puddingRepo.find();
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findOne(type: string, id: number) {
    let item;
    switch (type) {
      case 'cake':
        item = await this.cakeRepo.findOne({ where: { id } });
        break;
      case 'donut':
        item = await this.donutRepo.findOne({ where: { id } });
        break;
      case 'pastry':
        item = await this.pastryRepo.findOne({ where: { id } });
        break;
      case 'pudding':
        item = await this.puddingRepo.findOne({ where: { id } });
        break;
      default:
        throw new BadRequestException('Invalid product type');
    }
    if (!item) throw new NotFoundException(`${type} not found`);
    return item;
  }

  async update(type: string, id: number, dto: any) {
    let item;
    switch (type) {
      case 'cake':
        item = await this.cakeRepo.preload({ id, ...(dto as UpdateCakeDto) });
        if (!item) throw new NotFoundException('Cake not found');
        return this.cakeRepo.save(item);
      case 'donut':
        item = await this.donutRepo.preload({ id, ...(dto as UpdateDonutDto) });
        if (!item) throw new NotFoundException('Donut not found');
        return this.donutRepo.save(item);
      case 'pastry':
        item = await this.pastryRepo.preload({ id, ...(dto as UpdatePastryDto) });
        if (!item) throw new NotFoundException('Pastry not found');
        return this.pastryRepo.save(item);
      case 'pudding':
        item = await this.puddingRepo.preload({ id, ...(dto as UpdatePuddingDto) });
        if (!item) throw new NotFoundException('Pudding not found');
        return this.puddingRepo.save(item);
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async remove(type: string, id: number) {
    let item;
    switch (type) {
      case 'cake':
        item = await this.cakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Cake not found');
        await this.cakeRepo.remove(item);
        return { message: 'Cake removed successfully' };
      case 'donut':
        item = await this.donutRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Donut not found');
        await this.donutRepo.remove(item);
        return { message: 'Donut removed successfully' };
      case 'pastry':
        item = await this.pastryRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Pastry not found');
        await this.pastryRepo.remove(item);
        return { message: 'Pastry removed successfully' };
      case 'pudding':
        item = await this.puddingRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Pudding not found');
        await this.puddingRepo.remove(item);
        return { message: 'Pudding removed successfully' };
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findAll() {
    const [cakes, donuts, pastries, puddings] = await Promise.all([
      this.cakeRepo.find(),
      this.donutRepo.find(),
      this.pastryRepo.find(),
      this.puddingRepo.find(),
    ]);
    return {
      cakes,
      donuts,
      pastries,
      puddings,
    };
  }

}
