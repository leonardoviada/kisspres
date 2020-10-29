import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

export const validate = (...keys: string[]) => (target: any, key: string, desc: PropertyDescriptor) => {
  Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
};