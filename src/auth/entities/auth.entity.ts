import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('auth') // Define que la clase es una entidad
export class Auth {
    @PrimaryGeneratedColumn('uuid') // Genera un UUID como ID
    id: string;

    @Column({ nullable: false }) // Def@ine que el nombre es obligatorio
    name?: string;

    @Column({ unique: true }) // El correo electrónico también debe ser único
    email: string;

    @Column({ nullable: false }) // La contraseña no puede ser nula
    password: string;

    @CreateDateColumn() // Fecha de creación automática
    createdAt: Date;

    @UpdateDateColumn() // Fecha de actualización automática
    updatedAt: Date;
}