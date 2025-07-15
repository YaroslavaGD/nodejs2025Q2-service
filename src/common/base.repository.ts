import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class BaseStore<T extends { id: string }> {
  constructor(private readonly resources: T[]) {}

  findAll(): T[] {
    return [...this.resources];
  }

  findOne(id: string) {
    const resource = this.resources.find((r) => r.id === id);

    if (!resource)
      throw new NotFoundException(`Entity with id ${id} not found`);

    return resource;
  }

  create(dto: Partial<T>): T {
    const resource = { ...dto, id: randomUUID() } as T;

    this.resources.push(resource);

    return resource;
  }

  update(id: string, dto: Partial<T>): T {
    const resource = this.findOne(id);

    Object.assign(resource, dto);

    return resource;
  }

  remove(id: string) {
    const index = this.resources.findIndex((r) => r.id === id);

    if (index === -1)
      throw new NotFoundException(`Entity with id ${id} not found`);

    this.resources.splice(index, 1);
  }
}
