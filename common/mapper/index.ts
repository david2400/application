// src/common/mapper/mapper.ts
import 'reflect-metadata'
import {plainToInstance} from 'class-transformer'

type Constructor<T = any> = new (...args: any[]) => T

export class Mapper {
  private static instance: Mapper

  private constructor() {}

  static create(): Mapper {
    if (!Mapper.instance) {
      Mapper.instance = new Mapper()
    }
    return Mapper.instance
  }

  convertToListDto<D, T>(entityList: T[], dtoClass: new () => D): D[] {
    if (!entityList) return []
    return entityList.map((entity) => this.entityToDto(entity, dtoClass))
  }

  dtoToEntity<D, E>(dto: D, entityClass: new () => E): E {
    if (!dto) return null

    const entity = plainToInstance(entityClass, dto)
    this.mapAssociatedEntities(dto, entity)

    return entity
  }

  entityToDto<D, T>(entity: T, dtoClass: new () => D): D {
    if (!entity) return null
    return plainToInstance(dtoClass, entity)
  }

  getList<E>(entity: E): E[] {
    return entity ? [entity] : []
  }

  private mapAssociatedEntities<D, E>(dto: D, entity: E) {
    const dtoPrototype = Object.getPrototypeOf(dto)
    const dtoKeys = Object.keys(dto)

    dtoKeys.forEach((key) => {
      const relatedEntityClass = Reflect.getMetadata('foreignKey', dtoPrototype, key)
      const relatedEntityId = (dto as any)[key]

      if (relatedEntityClass && relatedEntityId) {
        const relatedEntityInstance = new relatedEntityClass()
        const idField = this.findIdField(relatedEntityClass)

        if (!idField) {
          throw new Error(`No field decorated with @Id found in ${relatedEntityClass.name}`)
        }

        relatedEntityInstance[idField] = relatedEntityId

        const matchingField = this.findEntityField(entity, relatedEntityClass)
        if (matchingField) {
          ;(entity as any)[matchingField] = relatedEntityInstance
        }
      }
    })
  }

  private findEntityField(entity: any, relatedEntityClass: Constructor): string | null {
    const keys = Object.keys(entity)
    for (const key of keys) {
      if (
        entity[key] instanceof relatedEntityClass ||
        entity[key]?.constructor === relatedEntityClass
      ) {
        return key
      }
    }
    return null
  }

  private findIdField(entityClass: Constructor): string | null {
    const keys = Object.getOwnPropertyNames(new entityClass())
    for (const key of keys) {
      const hasId = Reflect.getMetadata('id', entityClass.prototype, key)
      if (hasId) return key
    }
    return null
  }
}
