import PlayUI_Generate from "../ui-generate/PlayUI_generate";

export class PlayUI extends PlayUI_Generate {


    onStart() {
        this.jumpBtn.onClicked.add(() => {
            Player.localPlayer.character.jump();
        })
    }

}
