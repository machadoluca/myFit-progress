import 'dotenv/config';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function createUserToken(request, response) {
  try {
    const { email, password } = request.body;
    const user = await prisma.clients.findUniqueOrThrow({
      where: {
        email
      }
    });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    return response.status(202).send({ token });
  } catch {
    return response.status(404).json({ error: 'User not found' });
  }
}

export function verifyAuth(request, response) {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new Error('Token not provided');
    }
    const [, token] = authorization.split(' ');
    const isValidToken = jwt.verify(token, process.env.SECRET_KEY);

    if (isValidToken) {
      return response.status(200).send({ validToken: true });
    }
  } catch (error) {
    return response.status(401).send({ error: error.message });
  }
}

export function decodeToken(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new Error('Token not provided');
    }
    const [, token] = authorization.split(' ');
    const decodedToken = jwt.decode(token, process.env.SECRET_KEY);
    request.userId = decodedToken.userId;
    next();
  } catch (error) {
    return response.status(401).send({ error: error.message });
  }
}
