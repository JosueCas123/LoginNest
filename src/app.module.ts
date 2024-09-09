import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [  // Segunda conexión a PostgreSQL
    TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'postgres',
     password: 'root',
     database: 'Naabol',
     entities: [Auth], // Entidad para PostgreSQL
     synchronize: true, // Solo en desarrollo
     name: 'postgresConnection', // Nombre de la conexión para PostgreSQL
   }), AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
