import { method } from 'yoshi-serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const fetch = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).fetch(
    '8f520846-bed2-417b-b56d-2fcc377f5f54'
  );
});

export const addComment = method(async function (text, author) {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(
    this.context.aspects
  ).add('8f520846-bed2-417b-b56d-2fcc377f5f54', { text, author });
});
