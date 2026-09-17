import { render } from '@testing-library/react';

import FeatureSwapsDashboard from './feature-swaps-dashboard';

describe('FeatureSwapsDashboard', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<FeatureSwapsDashboard />);
        expect(baseElement).toBeTruthy();
    });
});
