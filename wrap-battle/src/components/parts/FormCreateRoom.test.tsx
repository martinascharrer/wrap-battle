import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FormCreateRoom } from './FormCreateRoom';
import { createRoom } from '../../services/room';

jest.mock('../../services/room');

describe('FormCreateRoom', () => {
    test('It should render a name input field.', () => {
        const { getByTestId } = render(<FormCreateRoom />);
        expect(getByTestId('name input')).toBeInTheDocument();
    });

    test('It should create the room with the given host name.', () => {
        const { getByTestId } = render(<FormCreateRoom />);
        const nameInput = getByTestId('name input').querySelector(
            'input'
        ) as HTMLInputElement;
        fireEvent.change(nameInput, { target: { value: 'Hans Wurst' } });
        const createRoomButton = getByTestId('create button');
        fireEvent.click(createRoomButton);
        expect(createRoom).toBeCalledWith('Hans Wurst');
    });
});
