/**
 * @jest-environment node
 */

import http from 'http';
import { openPage, eventually } from './support/index.js';

import { app } from '../app/server/app.js';

describe('home page', () => {
    let port = 5001;
    let server;
    let page;

    beforeEach(async () => {
        await new Promise((resolve) => {
            server = http.createServer(app).listen(port, () => {
                resolve(null);
            });
        });
        page = await openPage(`http://localhost:${port}`);
    });
    afterEach(() => {
        server.close();
    });

    test('displays expected message', async () => {
        await eventually(() => {
            expect(page.body.textContent).toMatch(/hello world/);
        });
    });
});
