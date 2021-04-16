import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('It should contain the headline', () => {
        render(<App />);
        expect(screen.getByTestId('headline')).toBeInTheDocument();
    });
});
