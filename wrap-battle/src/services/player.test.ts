import { genId } from '../utils/room';
import { createPlayer, getPlayerFromStorage } from './player';

jest.mock('../utils/room');

describe('player', () => {
    describe('createPlayer', () => {
        test('It should create a new player and store it to the session.', () => {
            createPlayer('Hans');
            expect(genId).toBeCalled();
            expect(sessionStorage.setItem).toBeCalledWith(
                'user',
                expect.stringContaining('Hans')
            );
        });
    });

    describe('getPlayerFromStorage', () => {
        test('It should get the player from the session storage.', () => {
            getPlayerFromStorage();
            expect(sessionStorage.getItem).toBeCalled();
        });
    });
});
