import { createRoom } from './room';
import { genId } from '../utils/room';

jest.mock('../utils/room');

// TODO: figure out how to test firestore easily
describe('room', () => {
    describe('createRoom', () => {
        test('It should create the firebase document with given id.', () => {
            createRoom('Herbert');
            expect(genId).toBeCalled();
        });
    });

    describe('joinRoom', () => {
        test('It should create the firebase document with given id.', () => {
            //joinRoom('ASCDE', 'Herbert')
            //expect(firestore).toBeCalled();
        });
    });
});
