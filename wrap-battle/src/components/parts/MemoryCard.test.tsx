import { render, screen } from '@testing-library/react';
import { MemoryCard } from './MemoryCard';

describe('MemoryCard', () => {
    describe('opened', () => {
        test('It should be opened and show the text.', () => {
            const { getByText } = render(
                <MemoryCard
                    onClick={() => {}}
                    memoryCard={{
                        id: 123,
                        content: 'Wrap',
                        state: 1,
                        image: 'no',
                    }}
                />
            );
            expect(getByText('Wrap'));
            expect(screen.queryByTestId('card image')).toBeNull();
        });

        test('It should be opened and show the image.', () => {
            const { getByTestId } = render(
                <MemoryCard
                    onClick={() => {}}
                    memoryCard={{
                        id: 123,
                        content: 'Wrap',
                        state: 1,
                        image: 'path-to-image',
                    }}
                />
            );
            expect(getByTestId('card image')).toBeInTheDocument();
        });
    });
    describe('closed', () => {
        test('It should not show neither the image nor the text.', () => {
            render(
                <MemoryCard
                    onClick={() => {}}
                    memoryCard={{
                        id: 123,
                        content: 'Wrap',
                        state: 0,
                        image: 'path-to-image',
                    }}
                />
            );
            expect(screen.queryByTestId('card image')).toBeNull();
            expect(screen.queryByTestId('card text')).toBeNull();
        });
    });
    describe('finished', () => {
        test('It should show the image.', () => {
            render(
                <MemoryCard
                    onClick={() => {}}
                    memoryCard={{
                        id: 123,
                        content: 'Wrap',
                        state: 2,
                        image: 'path-to-image',
                    }}
                />
            );
            expect(screen.queryByTestId('card image')).toBeInTheDocument();
            expect(screen.queryByTestId('card text')).toBeNull();
        });
        test('It should show the text.', () => {
            const { getByText } = render(
                <MemoryCard
                    onClick={() => {}}
                    memoryCard={{
                        id: 123,
                        content: 'Wrap',
                        state: 2,
                        image: 'no',
                    }}
                />
            );
            expect(getByText('Wrap'));
            expect(screen.queryByTestId('card text')).toBeInTheDocument();
            expect(screen.queryByTestId('card image')).toBeNull();
        });
    });
});
