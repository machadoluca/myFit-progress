import 'dotenv/config';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function createUserToken(request, response) {
  const { email, password } = request.body;
  const user = await prisma.clients.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return response.status(400).send({ error: 'email not found ' });
  }

  const passwordTest = await bcrypt.compare(password, user.password);

  if (!passwordTest) {
    return response.status(400).send({ error: 'password invalid' });
  }

  const token = jwt.sign({ userId: user.clientId }, process.env.SECRET_KEY, {
    expiresIn: '1h'
  });

  response.status(201).send({ token });
}

export async function verifyAuth(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send({ error: 'Token not provided' });
  }

  const [, token] = authorization.split(' ');

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch {
    return response.status(401).send({ error: 'Invalid token' });
  }
}

export async function decodeToken(auth) {
  const [, token] = auth.split(' ');
  const user = jwt.verify(token, process.env.SECRET_KEY);

  return user;
}
