import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormCreateRoom } from './FormCreateRoom';
import { createRoom } from '../../services/room';

jest.mock('../../services/room');

describe('FormCreateRoom', () => {
    test('It should render a name input field.', () => {
        render(<FormCreateRoom />);
        expect(screen.getByTestId('name input')).toBeInTheDocument();
    });

    test('It should create the room with the given host name.', () => {
        render(<FormCreateRoom />);
        const nameInput = screen.getByTestId('name input');
        fireEvent.change(nameInput, { target: { value: 'Hans Wurst' } });
        const createRoomButton = screen.getByTestId('create button');
        fireEvent.click(createRoomButton);
        expect(createRoom).toBeCalledWith('Hans Wurst');
    });
});
