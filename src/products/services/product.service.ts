import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(product: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ sku: product.sku });

    if (existingProduct) {
      throw new ConflictException(`Product with SKU ${product.sku} already exists`);
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products.map(product => {
      const firstAlphabetMissingLetter = this.getFirstAlphabetMissingLetter(product.name);
      return {
        ...product,
        firstAlphabetMissingLetter
      };
    });
  }

  async findOneById(id: number): Promise<Product & { firstAlphabetMissingLetter: string }> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const firstAlphabetMissingLetter = this.getFirstAlphabetMissingLetter(product.name);

    return {
      ...product,
      firstAlphabetMissingLetter
    };
  }

  async update(id: number, product: Product): Promise<Product> {
    const existingProduct = await this.productRepository.findOneBy({ id });

    if (!existingProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (product.id && product.id !== existingProduct.id) {
      throw new BadRequestException('Product ID should not be changed');
    }

    if (product.sku && product.sku !== existingProduct.sku) {
      const skuExists = await this.productRepository.findOneBy({ sku: product.sku });
      if (skuExists) {
        throw new ConflictException(`Product with SKU ${product.sku} already exists`);
      }
    }

    return this.productRepository.save({
      ...existingProduct,
      ...product
    });
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findOneById(id);

    return await this.productRepository.delete(id);
  }

  private getFirstAlphabetMissingLetter(name: string): string {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const normalized = name.toLowerCase().replace(/[^a-z]/g, '');
    const lettersInName = new Set(normalized);

    for (const letter of alphabet) {
      if (!lettersInName.has(letter)) {
        return letter;
      }
    }

    return '_';
  }
}