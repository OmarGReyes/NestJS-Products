import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './interfaces/producto.interface';
import { CreateProductDTO } from './dto/producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel('Producto') private prodcutoModel: Model<Producto>,
  ) {}

  async getProducts(): Promise<Producto[]> {
    const products = await this.prodcutoModel.find();
    return products;
  }

  async getProduct(productID: string): Promise<Producto> {
    const product = await this.prodcutoModel.findById(productID);
    return product;
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Producto> {
    const producto = new this.prodcutoModel(createProductDTO);
    return await producto.save();
  }

  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Producto> {
    return await this.prodcutoModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
  }

  async deleteProduct(productID: string): Promise<Producto> {
    return await this.prodcutoModel.findByIdAndDelete(productID);
  }
}
