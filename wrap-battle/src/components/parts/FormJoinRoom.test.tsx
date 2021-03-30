import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormJoinRoom } from './FormJoinRoom';
import { joinRoom } from '../../services/room';

jest.mock('../../services/room');

describe('FormCreateRoom', () => {
    test('It should render a name input field.', () => {
        render(<FormJoinRoom />);
        expect(screen.getByTestId('name input')).toBeInTheDocument();
    });

    test('It should add a new player to the existing room.', () => {
        render(<FormJoinRoom />);

        const nameInput = screen.getByTestId('name input');
        fireEvent.change(nameInput, { target: { value: 'Hans Wurst' } });
        const roomCodeInput = screen.getByTestId('room code input');
        fireEvent.change(roomCodeInput, { target: { value: 'ASDFGE' } });

        fireEvent.click(screen.getByTestId('join button'));
        expect(joinRoom).toBeCalledWith('ASDFGE', 'Hans Wurst');
    });
});
