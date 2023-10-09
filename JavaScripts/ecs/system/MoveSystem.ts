import { MoveComponent } from "../component/MoveComponent";
import { TransformComponent } from "../component/TransformComponent";
import { Entity } from "../lib/Entity";
import { System } from "../lib/System";

export class moveSystem extends System {
    update(dt: number, entities: Entity[]) {
        for (let entity of entities) {
            if (entity.hasComponent(MoveComponent) && entity.hasComponent(TransformComponent)) {
                continue;
            }
            let moveComponent = entity.getComponent(MoveComponent);
            let transformComponent = entity.getComponent(TransformComponent);
            const position = transformComponent.position;
            transformComponent.transform.position = position.add(moveComponent.velocity.multiply(dt));
        }
    }
}