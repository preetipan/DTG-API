import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { UserRole } from './entities/userRole.entity';
import { Transaction } from './entities/transaction.entity';
import { SubRound } from './entities/subRound.entity';
import { Round } from './entities/round.entity';
import { Group } from './entities/group.entity';
import { GroupModule } from './group/group.module';
import { RoundModule } from './round/round.module';
import { SubRoundModule } from './sub-round/sub-round.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [User, UserRole, Transaction, SubRound, Round, Group],
        synchronize: true,
      }),
    }),
    UserModule, GroupModule, RoundModule, SubRoundModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
