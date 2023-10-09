

export class Entity {

    components: Map<string, Component> = new Map();

    private _gameobject: GameObject;

    constructor(public id: number) {

    }
    get gameobject(): GameObject {
        return this._gameobject;
    }

    addComponent<T extends Component>(cls: { new(): T }): T {
        if (!this.components.has(cls.name)) {
            this.components.set(cls.name, new cls());
        }
        return this.components.get(cls.name) as T;
    }
    getComponent<T extends Component>(cls: { new(): T }): T {
        return this.components.get(cls.name) as T;
    }
    removeComponent<T extends Component>(cls: { new(): T }) {
        if (this.components.has(cls.name)) {
            this.components.delete(cls.name);
        }
    }
    hasComponent<T extends Component>(cls: { new(): T }) {
        return this.components.has(cls.name);
    }

}