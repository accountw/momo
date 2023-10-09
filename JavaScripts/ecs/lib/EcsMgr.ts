import { Entity } from "./Entity";
import { EntityMgr } from "./EntityMgr";
import { System } from "./System";

export class EcsMgr {

    private static _instance: EcsMgr = null;
    private _entityMgr: EntityMgr = new EntityMgr();
    private _systems: System[] = [];
    private constructor() {
    }

    public static get instance(): EcsMgr {
        if (EcsMgr._instance == null) {
            EcsMgr._instance = new EcsMgr();
        }
        return EcsMgr._instance;
    }

    public addSystem<T extends System>(cls: { new(): T }): T {
        let system: T = new cls();
        this._systems.push(system);
        return system;
    }

    public createEntity(): Entity {
        return this._entityMgr.createEntity();
    }

    public removeEntity(entity: Entity): void {
        this._entityMgr.removeEntity(entity);
    }

    public getEntity(id: number): Entity {
        return this._entityMgr.getEntity(id);
    }

    public update(dt: number): void {
        const entities: Entity[] = this._entityMgr.entities;
        for (let i: number = 0; i < this._systems.length; i++) {
            this._systems[i].update(dt, entities);
        }
    }

}