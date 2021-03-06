'use strict';

import * as assert from 'assert';
import * as cheerio from 'cheerio';
import * as mm from 'egg-mock';
import * as request from 'supertest';

describe('test/app/controller/news.test.ts', () => {
  const app = mm.app();
  before(async () => {
    await app.ready();
  });

  after(() => app.close());

  afterEach(mm.restore);

  it('should GET /news', async () => {
    const result = await request(app.callback()).get('/news').expect(200);
    const $ = cheerio.load(result.text);
    const listItem = $('.news-view .item');
    assert(listItem.length === app.config.news.pageSize);
  });

  it('should GET /news/item/:id', async () => {
    await request(app.callback())
    .get('/news/item/1')
    // just a example, use regex to test part of dom string, but should be strong characteristic
    .expect(/\/news\/item\/1/)
    .expect(200);
  });

  it('should GET /news/user/:id', async () => {
    await request(app.callback())
    .get('/news/user/activatedgeek')
    // just a example, use regex to test part of dom string, but should be strong characteristic
    .expect(/<span class="label">user:<\/span> activatedgeek/)
    .expect(200);
  });
});
