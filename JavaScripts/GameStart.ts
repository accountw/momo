import { EcsMgr } from "./ecs/lib/EcsMgr";
import { moveSystem } from "./ecs/system/MoveSystem";
import { TransformSystem } from "./ecs/system/TransformSystem";
import { PlayUI } from "./ui/PlayUI";

@Component
export default class GameStart extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            Player.localPlayer.character.asyncReady().then((cha) => {
                cha.complexMovementEnabled = false;
            })
            UIService.show(PlayUI);
        }
        EcsMgr.instance.addSystem(moveSystem);
        EcsMgr.instance.addSystem(TransformSystem);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }
}