export interface TodoItemProps {
    id?:number;
    title?: string;
    description?: string;
    visible:boolean;
    onClose:any;
    onSave:any
}

