import { Entity } from "./Entity";

export abstract class System {


    abstract update(dt: number, entities: Entity[]): void;

}