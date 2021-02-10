import { bootstrap } from 'yoshi-serverless-testing';
import HttpClient from 'yoshi-serverless-client';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { fetch, addComment } from '../src/api/comments.api';

const serverlessApp = bootstrap();
serverlessApp.beforeAndAfter();
let client: HttpClient;

beforeAll(async () => {
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});

it('should fetch', async () => {
  const aComment = { text: 'My comment', author: 'Zivile' };
  const commentsStub = serverlessApp.ambassador.createStub(
    NodeWorkshopScalaApp
  );
  commentsStub
    .CommentsService()
    .fetch.when('8f520846-bed2-417b-b56d-2fcc377f5f54')
    .resolve([aComment]);
  const response = await client.request(fetch)();
  expect(response).toEqual([aComment]);
});
