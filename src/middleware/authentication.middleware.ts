// middleware/authentication.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Simulated token (in a real app, this should come from the request headers)
    const token = req.headers['authorization']; 
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' }) ;
      
    }
   
    console.log('Decoded Token Header:', jwt.decode(token, { complete: true }).header);
    console.log('Decoded Token Payload:', jwt.decode(token, { complete: true }).payload);
    try {

      console.log("KEY =",process.env.JWT_SECRET)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.info('decodedToken',decodedToken)

      next(); // Proceed to the next middleware
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized' });
    } 
  }
}
