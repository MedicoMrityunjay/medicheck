import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom"; // Ensure matchers are available

describe('Infrastructure Test', () => {
    it('renders a simple div', () => {
        render(<div data-testid="test">Hello World</div>);
        expect(screen.getByTestId('test')).toHaveTextContent('Hello World');
    });
});
