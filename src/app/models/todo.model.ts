export interface Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
}


export class TodoClass {
    Status: boolean;
    Thing: string;

    constructor(_Thing: string, _Status: boolean = false){
        this.Status = _Status;
        this.Thing = _Thing;
    }
}

export enum TodoStatusType {
    All,
    Active,
    Completed
}