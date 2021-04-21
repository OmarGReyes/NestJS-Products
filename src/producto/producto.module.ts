import { Module } from '@nestjs/common';
import { ProductoController } from './producto.controller';
import { ProductoService } from './producto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/producto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Producto', schema: ProductSchema }]),
  ],
  controllers: [ProductoController],
  providers: [ProductoService],
})
export class ProductoModule {}
