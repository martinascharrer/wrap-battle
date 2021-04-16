import { fireEvent, render } from '@testing-library/react';
import { WaitingOverview } from './WaitingOverview';
import { setGameActive } from '../../services/room';

jest.mock('../../hooks/useRoom', () => ({
    __esModule: true,
    default: () => ({
        roomId: 'asfd',
        players: [
            {
                id: 'foo',
                name: 'Hans Wurst',
                isHost: false,
                isOnTurn: false,
                nachos: 0,
            },
        ],
        isActive: false,
        playerOnTurn: { id: 'foo' },
        host: { id: 'foo' },
    }),
}));

jest.mock('../../services/player', () => ({
    getPlayerFromStorage: () => ({ id: 'foo' }),
}));

jest.mock('../../services/room');

describe('WaitingOverview', () => {
    test('It should render the players name.', () => {
        const { getByTestId, getByText } = render(<WaitingOverview />);
        expect(getByTestId('player list')).toBeInTheDocument();
        expect(getByText('Hans Wurst'));
    });

    test('It should show the `start game` button and start the game.', () => {
        const { getByTestId } = render(<WaitingOverview />);
        const startButton = getByTestId('create button');
        expect(startButton).toBeInTheDocument();
        fireEvent.click(startButton);
        expect(setGameActive).toBeCalled();
    });
});
