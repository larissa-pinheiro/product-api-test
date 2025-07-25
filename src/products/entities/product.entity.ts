import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Product Name' })
  @MaxLength(255, { message: 'Name exceeds length limit.' })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  @Column({ length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 100 })
  @IsPositive({ message: 'Price must be a positive number.' })
  @IsNotEmpty({ message: 'Price is required.' })
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ example: 'SKU12345' })
  @MaxLength(100, { message: 'SKU exceeds length limit.' })
  @IsString({ message: 'SKU must be a string.' })
  @IsNotEmpty({ message: 'SKU is required.' })
  @Column({ length: 100, nullable: false, unique: true })
  sku: string;
}