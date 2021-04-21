import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
  constructor(private productService: ProductoService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    res.status(HttpStatus.OK).json({
      message: 'Product successfully created',
      product: product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    res.status(HttpStatus.OK).json({
      message: 'Products',
      products,
    });
  }

  @Get('/:id')
  async getProduct(@Res() res, @Param('id') id) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exists');
    res.status(HttpStatus.OK).json({
      message: 'Product finded',
      product,
    });
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('id') id) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exists');
    res.status(HttpStatus.OK).json({
      message: 'Product deleted',
      product,
    });
  }

  @Put('/:id')
  async updateProduct(
    @Res() res,
    @Param('id') id,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const productUpdated = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!productUpdated) throw new NotFoundException('Product does not exists');
    return res.status(HttpStatus.OK).json({
      message: 'product updated',
      productUpdated,
    });
  }
}
