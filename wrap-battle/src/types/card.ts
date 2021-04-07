export enum CardState {
    CLOSED,
    OPENED,
    FINISHED,
}

export type Card = {
    id: number;
    content: string;
    image: string;
    state: CardState;
};
