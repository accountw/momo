import { NodeState } from "./NodeState";
import { NodeType } from "./NodeType";

export interface ITreeNode<T> {

    get type(): NodeType;
    run(dt: number, owner: T): NodeState;
    addChild(node: TreeNode<T>);
    removeChild(node: TreeNode<T>);
}

/**
 * 行为树节点基类
 */
export abstract class TreeNode<T> implements ITreeNode<T>{

    protected _children: TreeNode<T>[] = [];

    abstract run(dt: number, owner: T): NodeState;

    abstract get type(): NodeType;
    addChild(node: TreeNode<T>) {
        this._children.push(node);
    }

    removeChild(node: TreeNode<T>) {
        const index = this._children.indexOf(node);
        if (index > -1) {
            this._children.splice(index, 1);
        }
    }
}

/**
 * 选择节点, 从左到右依次执行子节点，直到遇到一个成功或者运行中的节点，返回该节点的状态
 */
export class SelectorNode<T> extends TreeNode<T> {

    private _currentNode: TreeNode<T>;
    run(dt: number, owner: T): NodeState {
        if (this._currentNode) {
            const state = this._currentNode.run(dt, owner);
            if (state == NodeState.Running) {
                return NodeState.Running;
            }
            if (state == NodeState.Success) {
                return NodeState.Success;
            }
        }
        for (let i = 0; i < this._children.length; i++) {
            const child = this._children[i];
            const state = child.run(dt, owner);
            if (state == NodeState.Success) {
                return state;
            }
            if (state == NodeState.Running) {
                this._currentNode = child;
                return NodeState.Running;
            }
        }
        this._currentNode = null;
        return NodeState.Failure;
    }
    get type(): NodeType {
        return NodeType.Selector;
    }
}

/**
 * 顺序节点, 从左到右依次执行子节点，直到遇到一个失败或者运行中的节点，返回该节点的状态
 */
export class SequenceNode<T> extends TreeNode<T>{

    private _currentNode: TreeNode<T>;
    run(dt: number, owner: T): NodeState {
        if (this._currentNode) {
            const state = this._currentNode.run(dt, owner);
            if (state == NodeState.Running) {
                return NodeState.Running;
            }
            if (state == NodeState.Failure) {
                return NodeState.Failure;
            }
        }
        for (let i = 0; i < this._children.length; i++) {
            const child = this._children[i];
            const state = child.run(dt, owner);
            if (state == NodeState.Failure) {
                return state;
            }
            if (state == NodeState.Running) {
                this._currentNode = child;
                return NodeState.Running;
            }
        }
        this._currentNode = null;
        return NodeState.Success;
    }
    get type(): NodeType {
        return NodeType.Sequence;
    }
}

/**
 * 并行节点, 从左到右依次执行子节点，直到所有子节点都返回成功或者失败，返回该节点的状态
 */
export class ParallelNode<T> extends TreeNode<T>{

    run(dt: number, owner: T): NodeState {
        let successCount = 0;
        let failureCount = 0;
        for (let i = 0; i < this._children.length; i++) {
            const child = this._children[i];
            const state = child.run(dt, owner);
            if (state == NodeState.Success) {
                successCount++;
            }
            else if (state == NodeState.Failure) {
                failureCount++;
            }
        }
        if (successCount == this._children.length) {
            return NodeState.Success;
        }
        if (failureCount == this._children.length) {
            return NodeState.Failure;
        }
        return NodeState.Running;
    }
    get type(): NodeType {
        return NodeType.Parallel;
    }
}
/**
 * 条件节点, 通过传入的条件函数判断是否返回成功
 */
export abstract class ConditionNode<T> extends TreeNode<T>{

    run(dt: number, owner: T): NodeState {
        return this.condition(owner) ? NodeState.Success : NodeState.Failure;
    }

    abstract condition: (owner: T) => boolean;

    get type(): NodeType {
        return NodeType.Condition;
    }
}

/**
 * 动作节点, 通过传入的动作函数执行动作
 */
export abstract class ActionNode<T> extends TreeNode<T>{

    run(dt: number, owner: T): NodeState {
        return this.action(owner);
    }

    abstract action: (owner: T) => NodeState;

    get type(): NodeType {
        return NodeType.Action;
    }
}
/**
 * 装饰节点, 通过传入的装饰函数执行装饰
 */
export abstract class DecoratorNode<T> extends TreeNode<T>{

    run(dt: number, owner: T): NodeState {
        return this.decorator(owner);
    }
    decorator: (owner: T) => NodeState;
    get type(): NodeType {
        return NodeType.Decorator;
    }
}