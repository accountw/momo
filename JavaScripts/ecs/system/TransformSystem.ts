import { TransformComponent } from "../component/TransformComponent";
import { Entity } from "../lib/Entity";
import { EntityMgr } from "../lib/EntityMgr";
import { System } from "../lib/System";

export class TransformSystem extends System {
    update(dt: number, entities: Entity[]): void {
        for (let entity of entities) {
            if (entity.hasComponent(TransformComponent)) {
                let transformComponent = entity.getComponent(TransformComponent);
                entity.gameobject.worldTransform = transformComponent.transform;
            }
        }
    }

}