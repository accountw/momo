export class TransformComponent extends Component {
    private _transform: Transform = new Transform();

    get transform(): Transform {
        return this._transform.clone();
    }
    set transform(v: Transform) {
        this._transform.position.set(v.position);
        this._transform.rotation.set(v.rotation);
        this._transform.scale.set(v.scale);
    }
    get position(): Vector {
        return this._transform.position.clone();
    }
    set position(v: Vector) {
        this._transform.position.set(v);
    }

    get rotation(): Rotation {
        return this._transform.rotation.clone();
    }
    set rotation(v: Rotation) {
        this._transform.rotation.set(v);
    }

    get scale(): Vector {
        return this._transform.scale.clone();
    }
    set scale(v: Vector) {
        this._transform.scale.set(v);
    }

}