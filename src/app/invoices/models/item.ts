export interface IItem {
    itemId: number,
    code: string,
    name: string,
    imageUrl: string
}

export class Item {
    itemId: number;
    code: string;
    name: string;
    imageUrl: string;
    isAdded: boolean;
    constructor(item: IItem) { 
        this.itemId = item.itemId;
        this.code = item.code;
        this.name = item.name;
        this.imageUrl = item.imageUrl;
        this.isAdded = false;
    }
    
}
