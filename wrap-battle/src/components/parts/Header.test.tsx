import { render } from '@testing-library/react';
import { Header } from './Header';
import { Player } from '../../types/player';

jest.mock('../../hooks/useRoom', () => ({
    __esModule: true,
    default: () => ({
        room: {
            timerValue: '3',
        },
        roomId: 'asfd',
        players: [],
        isActive: false,
        playerOnTurn: { id: 'foo' },
        host: { id: 'foo' },
    }),
}));

const mockPlayer: Player = {
    id: 'asd',
    name: 'Hans',
    isOnTurn: true,
    nachos: 0,
    isHost: false,
};

describe('Header', () => {
    test('It should render the players name and remaining time.', () => {
        const { getByTestId } = render(<Header playerOnTurn={mockPlayer} />);
        expect(getByTestId('time counter').innerHTML).toContain('3');
        expect(getByTestId('player on turn').innerHTML).toBe(
            'Hans is picking cards'
        );
    });
});
