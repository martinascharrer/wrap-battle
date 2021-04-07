export enum CardState {
    CLOSED,
    OPENED,
    FINISHED
}


export interface Card {
    id: number;
    content: string,
    image: string,
    state: CardState
}