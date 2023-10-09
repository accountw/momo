
export class MoveComponent extends Component {
    private _velocity: Vector = new Vector();

    get velocity(): Vector {
        return this._velocity.clone();
    }
    set velocity(v: Vector) {
        this._velocity.set(v);
    }
}