import React, { FC } from 'react';
import {
  useTranslation,
  useAppLoaded,
  useRequest,
  useHttpClient,
} from 'yoshi-flow-bm-runtime';
import { Page, Container, Button, Text } from 'wix-style-react';
import { fetch, addComment } from '../api/comments.api';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { t } = useTranslation();

  const httpClient = useHttpClient();

  const { loading, error, data } = useRequest(fetch);

  if (loading) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  const add = (author: string, text: string) => {
    httpClient.request(addComment)(author, text);
  };

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Container>
          <Text data-hook="comments-section">
            {data && data.length !== 0
              ? data.map((value) => {
                  return (
                    <>
                      <span>{value.text}</span>
                      <span>{value.author}</span>
                    </>
                  );
                })
              : ''}
          </Text>
          <Button onClick={() => add('another-author', 'another-comment')}>
            Click here
          </Button>
        </Container>
      </Page.Content>
    </Page>
  );
};

export default Index;
