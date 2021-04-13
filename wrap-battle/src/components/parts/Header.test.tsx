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
        const { getByTestId } = render(<Header playerOnTurn={mockPlayer} />);
        expect(getByTestId('time counter').innerHTML).toBe('3');
        expect(getByTestId('player on turn').innerHTML).toBe(
            'Hans is picking cards'
        );
    });
});
