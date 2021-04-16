import { render } from '@testing-library/react';
import { MemoryGame } from './MemoryGame';

jest.mock('../../hooks/useRoom', () => ({
    __esModule: true,
    default: () => ({
        roomId: 'asfd',
        players: [
            {
                id: 'foo',
                name: 'Thomas',
                isHost: true,
                isOnTurn: true,
                nachos: 5,
            },
            {
                id: 'bar',
                name: 'Hans',
                isHost: false,
                isOnTurn: false,
                nachos: 2,
            },
        ],
        isActive: true,
        playerOnTurn: { id: 'foo' },
        host: { id: 'foo' },
    }),
}));

jest.mock('../../services/player', () => ({
    getPlayerFromStorage: () => ({ id: 'foo' }),
}));

jest.mock('../../services/room');

describe('MemoryGame', () => {
    test('It should render the game board.', () => {
        const { getByTestId } = render(<MemoryGame />);
        expect(getByTestId('memory game')).toBeInTheDocument();
    });

    test('It should render the host name and scores.', () => {
        const { getByTestId } = render(<MemoryGame />);
        expect(getByTestId('player on turn name').innerHTML).toBe('Thomas');
        expect(getByTestId('player on turn nachos').innerHTML).toContain('5');
        expect(getByTestId('player name').innerHTML).toBe('Hans');
        expect(getByTestId('player nachos').innerHTML).toContain('2');
    });
});
