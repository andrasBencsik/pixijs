import { RenderTexture } from '../../src/rendering/renderers/shared/texture/RenderTexture';
import { Container } from '../../src/scene/container/Container';
import { getWebGLRenderer } from '../utils/getRenderer';

import type { WebGLRenderer } from '../../src/rendering/renderers/gl/WebGLRenderer';
import { writeFileSync } from 'fs';
import { coverageResults } from '../../customCoverageTool';

describe('GlBackBufferSystem', () =>
{
    it('should activate only when the target is a canvas element (rather than a render texture)', async () =>
    {
        const renderer = await getWebGLRenderer({}) as WebGLRenderer;
        const container = new Container();

        renderer.backBuffer.useBackBuffer = false;

        renderer.backBuffer['renderStart']({
            target: renderer.view.texture,
            container
        });

        expect(renderer.backBuffer['_useBackBufferThisRender']).toEqual(false);

        renderer.backBuffer.useBackBuffer = true;

        renderer.backBuffer['renderStart']({
            target: renderer.view.texture,
            container
        });

        expect(renderer.backBuffer['_useBackBufferThisRender']).toEqual(true);

        const texture = RenderTexture.create({
            width: 100,
            height: 100,
        });

        renderer.backBuffer['renderStart']({
            target: texture,
            container
        });

        expect(renderer.backBuffer['_useBackBufferThisRender']).toEqual(false);
    });

    it('should deactivate antialiasing if active', async () =>
    {
        const renderer = await getWebGLRenderer({ antialias: true, useBackBuffer: true }) as WebGLRenderer;

        const container = new Container();

        const options = {
            target: renderer.view.texture,
            container
        };

        renderer.backBuffer['renderStart']({
            target: renderer.view.texture,
            container
        });

        expect(renderer.gl.getContextAttributes().antialias).toEqual(false);
        expect(options.target.source.antialias).toEqual(true);
    });

    afterEach(() =>
        {   
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
});
