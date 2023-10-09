import { Entity } from "./Entity";

export class EntityMgr {

    private _index: number = 0;
    private _entities: Entity[] = [];
    private _entityMap: Map<number, Entity> = new Map();

    createEntity(): Entity {
        let entity = new Entity(this._index++);
        this._entityMap.set(entity.id, entity);
        this._entities.push(entity);
        return entity;
    }

    removeEntity(entity: Entity) {
        let index: number = this._entities.indexOf(entity);
        if (index >= 0) {
            this._entities.splice(index, 1);
        }
        this._entityMap.delete(entity.id);
    }
    getEntity(id: number): Entity {
        return this._entityMap.get(id);
    }
    get entities(): Entity[] {
        return this._entities;
    }
    get count(): number {
        return this._entities.length;
    }
    clear() {
        this._entityMap.clear();
        this._entities.length = 0;
    }

}