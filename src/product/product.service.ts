import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Donut } from './entities/donut.entity';
import { deliciousCake } from './entities/deliciousCake.entity';
import { dryCake } from './entities/dryCake.entity';
import { cupCake } from './entities/cupCake.entity';
import { Pastry } from './entities/pastry.entity';
import { Pudding } from './entities/pudding.entity';
import { CreateCakeDto, CreateDonutDto, CreatePastryDto, CreatePuddingDto } from './dto/create-product.dto';
import { UpdateCakeDto, UpdateDonutDto, UpdatePastryDto, UpdatePuddingDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Donut)
    private donutRepo: Repository<Donut>,
    @InjectRepository(deliciousCake)
    private deliciousCakeRepo: Repository<deliciousCake>,
    @InjectRepository(dryCake)
    private dryCakeRepo: Repository<dryCake>,
    @InjectRepository(cupCake)
    private cupCakeRepo: Repository<cupCake>,
    @InjectRepository(Pastry)
    private pastryRepo: Repository<Pastry>,
    @InjectRepository(Pudding)
    private puddingRepo: Repository<Pudding>,
  ) { }

  async create(type: string, dto: any) {
    switch (type) {
      case 'deliciousCake':
        return this.deliciousCakeRepo.save(this.deliciousCakeRepo.create(dto as CreateCakeDto));
      case 'dryCake':
        return this.dryCakeRepo.save(this.dryCakeRepo.create(dto as CreateCakeDto));
      case 'cupCake':
        return this.cupCakeRepo.save(this.cupCakeRepo.create(dto as CreateCakeDto));
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
      case 'deliciousCake':
        return this.deliciousCakeRepo.find();
      case 'dryCake':
        return this.dryCakeRepo.find();
      case 'cupCake':
        return this.cupCakeRepo.find();
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

  async findOne(type: string, id: string) {
    let item;
    switch (type) {
      case 'deliciousCake':
        item = await this.deliciousCakeRepo.findOne({ where: { id } });
        break;
      case 'dryCake':
        item = await this.dryCakeRepo.findOne({ where: { id } });
        break;
      case 'cupCake':
        item = await this.cupCakeRepo.findOne({ where: { id } });
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

  async update(type: string, id: string, dto: any) {
    let item;
    switch (type) {
      case 'deliciousCake':
        item = await this.deliciousCakeRepo.preload({ id, ...(dto as UpdateCakeDto) });
        if (!item) throw new NotFoundException('Delicious Cake not found');
        return this.deliciousCakeRepo.save(item);
      case 'dryCake':
        item = await this.dryCakeRepo.preload({ id, ...(dto as UpdateCakeDto) });
        if (!item) throw new NotFoundException('Dry Cake not found');
        return this.dryCakeRepo.save(item);
      case 'cupCake':
        item = await this.cupCakeRepo.preload({ id, ...(dto as UpdateCakeDto) });
        if (!item) throw new NotFoundException('Cup Cake not found');
        return this.cupCakeRepo.save(item);
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

  async remove(type: string, id: string) {
    let item;
    switch (type) {
      case 'deliciousCake':
        item = await this.deliciousCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Delicious Cake not found');
        await this.deliciousCakeRepo.remove(item);
        return { message: 'Delicious Cake removed successfully' };
      case 'dryCake':
        item = await this.dryCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Dry Cake not found');
        await this.dryCakeRepo.remove(item);
        return { message: 'Dry Cake removed successfully' };
      case 'cupCake':
        item = await this.cupCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Cup Cake not found');
        await this.cupCakeRepo.remove(item);
        return { message: 'Cup Cake removed successfully' };
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
    const [deliciousCakes, dryCakes, cupCakes, donuts, pastries, puddings] = await Promise.all([
      this.deliciousCakeRepo.find(),
      this.dryCakeRepo.find(),
      this.cupCakeRepo.find(),
      this.donutRepo.find(),
      this.pastryRepo.find(),
      this.puddingRepo.find(),
    ]);
    return {
      deliciousCakes,
      dryCakes,
      cupCakes,
      donuts,
      pastries,
      puddings,
    };
  }

}
