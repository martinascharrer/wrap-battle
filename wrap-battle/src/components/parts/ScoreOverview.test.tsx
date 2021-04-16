import { fireEvent, render } from '@testing-library/react';
import { ScoreOverview } from './ScoreOverview';

const players = [
    {
        id: 'bar',
        name: 'Second',
        isHost: false,
        isOnTurn: false,
        nachos: 0,
    },
    {
        id: 'foo',
        name: 'First',
        isHost: false,
        isOnTurn: false,
        nachos: 5,
    },
];

describe('ScoreOverview', () => {
    test('It should render the players names with correct rank.', () => {
        const { getByText } = render(<ScoreOverview players={players} />);
        expect(getByText('1. First'));
        expect(getByText('2. Second'));
    });
});
