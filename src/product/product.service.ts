import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliciousCake } from './entities/delicious-cake.entity';
import { Brownie } from './entities/brownie.entity';
import { DryCake } from './entities/dry-cake.entity';
import { CupCake } from './entities/cup-cake.entity';
import { Cookie } from './entities/cookie.entity';
import { Donut } from './entities/donut.entity';
import { Mousse } from './entities/mousse.entity';
import { 
  CreateDeliciousCakeDto, 
  CreateBrownieDto, 
  CreateDryCakeDto, 
  CreateCupCakeDto, 
  CreateCookieDto, 
  CreateDonutDto, 
  CreateMousseDto 
} from './dto/create-product.dto';
import { 
  UpdateDeliciousCakeDto, 
  UpdateBrownieDto, 
  UpdateDryCakeDto, 
  UpdateCupCakeDto, 
  UpdateCookieDto, 
  UpdateDonutDto, 
  UpdateMousseDto 
} from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(DeliciousCake)
    private readonly deliciousCakeRepo: Repository<DeliciousCake>,
    @InjectRepository(Brownie)
    private readonly brownieRepo: Repository<Brownie>,
    @InjectRepository(DryCake)
    private readonly dryCakeRepo: Repository<DryCake>,
    @InjectRepository(CupCake)
    private readonly cupCakeRepo: Repository<CupCake>,
    @InjectRepository(Cookie)
    private readonly cookieRepo: Repository<Cookie>,
    @InjectRepository(Donut)
    private readonly donutRepo: Repository<Donut>,
    @InjectRepository(Mousse)
    private readonly mousseRepo: Repository<Mousse>,
  ) { }

  async create(type: string, dto: any) {
    switch (type) {
      case 'delicious-cake':
        return this.deliciousCakeRepo.save(this.deliciousCakeRepo.create(dto as CreateDeliciousCakeDto));
      case 'brownie':
        return this.brownieRepo.save(this.brownieRepo.create(dto as CreateBrownieDto));
      case 'dry-cake':
        return this.dryCakeRepo.save(this.dryCakeRepo.create(dto as CreateDryCakeDto));
      case 'cup-cake':
        return this.cupCakeRepo.save(this.cupCakeRepo.create(dto as CreateCupCakeDto));
      case 'cookie':
        return this.cookieRepo.save(this.cookieRepo.create(dto as CreateCookieDto));
      case 'donut':
        return this.donutRepo.save(this.donutRepo.create(dto as CreateDonutDto));
      case 'mousse':
        return this.mousseRepo.save(this.mousseRepo.create(dto as CreateMousseDto));
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findAllByType(type: string) {
    switch (type) {
      case 'delicious-cake':
        return this.deliciousCakeRepo.find();
      case 'brownie':
        return this.brownieRepo.find();
      case 'dry-cake':
        return this.dryCakeRepo.find();
      case 'cup-cake':
        return this.cupCakeRepo.find();
      case 'cookie':
        return this.cookieRepo.find();
      case 'donut':
        return this.donutRepo.find();
      case 'mousse':
        return this.mousseRepo.find();
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findOne(type: string, id: string) {
    let item;
    switch (type) {
      case 'delicious-cake':
        item = await this.deliciousCakeRepo.findOne({ where: { id } });
        break;
      case 'brownie':
        item = await this.brownieRepo.findOne({ where: { id } });
        break;
      case 'dry-cake':
        item = await this.dryCakeRepo.findOne({ where: { id } });
        break;
      case 'cup-cake':
        item = await this.cupCakeRepo.findOne({ where: { id } });
        break;
      case 'cookie':
        item = await this.cookieRepo.findOne({ where: { id } });
        break;
      case 'donut':
        item = await this.donutRepo.findOne({ where: { id } });
        break;
      case 'mousse':
        item = await this.mousseRepo.findOne({ where: { id } });
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
      case 'delicious-cake':
        item = await this.deliciousCakeRepo.preload({ id, ...(dto as UpdateDeliciousCakeDto) });
        if (!item) throw new NotFoundException('Delicious cake not found');
        return this.deliciousCakeRepo.save(item);
      case 'brownie':
        item = await this.brownieRepo.preload({ id, ...(dto as UpdateBrownieDto) });
        if (!item) throw new NotFoundException('Brownie not found');
        return this.brownieRepo.save(item);
      case 'dry-cake':
        item = await this.dryCakeRepo.preload({ id, ...(dto as UpdateDryCakeDto) });
        if (!item) throw new NotFoundException('Dry cake not found');
        return this.dryCakeRepo.save(item);
      case 'cup-cake':
        item = await this.cupCakeRepo.preload({ id, ...(dto as UpdateCupCakeDto) });
        if (!item) throw new NotFoundException('Cup cake not found');
        return this.cupCakeRepo.save(item);
      case 'cookie':
        item = await this.cookieRepo.preload({ id, ...(dto as UpdateCookieDto) });
        if (!item) throw new NotFoundException('Cookie not found');
        return this.cookieRepo.save(item);
      case 'donut':
        item = await this.donutRepo.preload({ id, ...(dto as UpdateDonutDto) });
        if (!item) throw new NotFoundException('Donut not found');
        return this.donutRepo.save(item);
      case 'mousse':
        item = await this.mousseRepo.preload({ id, ...(dto as UpdateMousseDto) });
        if (!item) throw new NotFoundException('Mousse not found');
        return this.mousseRepo.save(item);
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async remove(type: string, id: string) {
    let item;
    switch (type) {
      case 'delicious-cake':
        item = await this.deliciousCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Delicious cake not found');
        await this.deliciousCakeRepo.remove(item);
        return { message: 'Delicious cake removed successfully' };
      case 'brownie':
        item = await this.brownieRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Brownie not found');
        await this.brownieRepo.remove(item);
        return { message: 'Brownie removed successfully' };
      case 'dry-cake':
        item = await this.dryCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Dry cake not found');
        await this.dryCakeRepo.remove(item);
        return { message: 'Dry cake removed successfully' };
      case 'cup-cake':
        item = await this.cupCakeRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Cup cake not found');
        await this.cupCakeRepo.remove(item);
        return { message: 'Cup cake removed successfully' };
      case 'cookie':
        item = await this.cookieRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Cookie not found');
        await this.cookieRepo.remove(item);
        return { message: 'Cookie removed successfully' };
      case 'donut':
        item = await this.donutRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Donut not found');
        await this.donutRepo.remove(item);
        return { message: 'Donut removed successfully' };
      case 'mousse':
        item = await this.mousseRepo.findOne({ where: { id } });
        if (!item) throw new NotFoundException('Mousse not found');
        await this.mousseRepo.remove(item);
        return { message: 'Mousse removed successfully' };
      default:
        throw new BadRequestException('Invalid product type');
    }
  }

  async findAll() {
    const [deliciousCakes, brownies, dryCakes, cupCakes, cookies, donuts, mousses] = await Promise.all([
      this.deliciousCakeRepo.find(),
      this.brownieRepo.find(),
      this.dryCakeRepo.find(),
      this.cupCakeRepo.find(),
      this.cookieRepo.find(),
      this.donutRepo.find(),
      this.mousseRepo.find(),
    ]);
    return {
      deliciousCakes,
      brownies,
      dryCakes,
      cupCakes,
      cookies,
      donuts,
      mousses,
    };
  }
}