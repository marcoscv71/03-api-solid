import type { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";
import type { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    // buscar o usuario no banco pelo e-mail
    // comparar se a senha salva no banco bate com a senha passada por param
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Boolean => sempre escrever de uma forma que a leitura seja semantica

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
