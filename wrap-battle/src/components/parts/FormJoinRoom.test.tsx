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
        const { getByTestId } = render(<FormJoinRoom />);

        const nameInput = getByTestId('name input').querySelector(
            'input'
        ) as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Hans Wurst' } });
        const roomCodeInput = getByTestId('room code input').querySelector(
            'input'
        ) as HTMLInputElement;
        fireEvent.change(roomCodeInput, { target: { value: 'ASDFGE' } });
        fireEvent.click(getByTestId('join button'));
        expect(joinRoom).toBeCalledWith('ASDFGE', 'Hans Wurst');
    });
});
