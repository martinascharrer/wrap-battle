import { render } from '@testing-library/react';
import { Header } from './Header';
import { Player } from '../../types/player';

const mockPlayer: Player = {
    id: 'asd',
    name: 'Hans',
    isOnTurn: false,
    timeLeft: 3,
    nachos: 0,
    isHost: false,
};

describe('Header', () => {
    test('It should render the players name and remaining time.', () => {
        const { getByText } = render(<Header playerOnTurn={mockPlayer} />);
        expect(getByText('3'));
        expect(getByText('Hans'));
    });
});
