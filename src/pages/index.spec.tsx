import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { PageHeaderTestkit, TextTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from 'yoshi-flow-bm/testkit';
import Index from './index';
import { fetch } from '../api/comments.api';

describe('index', () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it('renders initial products', async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        {
          request: { method: fetch, args: [] },
          result: () => ({
            comments: [
              {
                text: 'some product',
                author: 'some author',
              },
            ],
          }),
        },
      ],
    });

    const { getByTestId, baseElement } = render(<TestComponent />);
    await waitForElement(() => getByTestId('comments-section'));

    const textTestkit = TextTestkit({
      wrapper: baseElement,
      dataHook: 'app-title',
    });

    expect(await textTestkit.getText()).toBe('some productsome author');
  });
});
