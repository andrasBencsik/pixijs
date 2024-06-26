import { Point } from '../../../src/maths/point/Point';
import { Texture } from '../../../src/rendering/renderers/shared/texture/Texture';
import { Bounds } from '../../../src/scene/container/bounds/Bounds';
import { getGlobalBounds } from '../../../src/scene/container/bounds/getGlobalBounds';
import { Container } from '../../../src/scene/container/Container';
import { TilingSprite } from '../../../src/scene/sprite-tiling/TilingSprite';
import { getWebGLRenderer } from '../../utils/getRenderer';
import { getTexture } from '../../utils/getTexture';
import '../../../src/scene/sprite-tiling/init';
import '../../../src/scene/mesh/init';

import type { TextureSource } from '../../../src/rendering/renderers/shared/texture/sources/TextureSource';
<<<<<<< HEAD
import { coverageResults } from '../../../customCoverageTool';
import { writeFileSync } from 'fs-extra';
=======
import { writeFileSync } from 'fs-extra';
import { coverageResults } from '../../../customCoverageTool';
>>>>>>> origin/assignment1

describe('TilingSprite', () =>
{
    type SetupOptions = {
        texture: Texture;
        source: TextureSource;
        width: number;
        height: number;
        x: number;
        y: number;
        anchor: { x: number; y: number };
    };

    const setup = (options: Partial<SetupOptions> = {}) =>
    {
        const { texture, source, width = 256, height = 256, x = 0, y = 0, anchor = { x: 0, y: 0 } } = options;

        const sprite = new TilingSprite({
            texture: texture ?? new Texture({ source }),
            width,
            height,
            x,
            y,
            anchor,
        });

        return sprite;
    };

    describe('Lifecycle', () =>
    {
        it('should accept constructor arguments', () =>
        {
            const x = 10;
            const y = 20;
            const width = 100;
            const height = 200;
            const anchor = { x: 0.5, y: 0.5 };

            const sprite = setup({
                texture: getTexture({ width: 256, height: 256 }),
                x, y,
                width, height,
                anchor,
            });

            expect(sprite.x).toBe(x);
            expect(sprite.y).toBe(y);
            expect(sprite.width).toBe(width);
            expect(sprite.height).toBe(height);
            expect(sprite.anchor.x).toBe(anchor.x);
            expect(sprite.anchor.y).toBe(anchor.y);
        });

        it('should not throw when destroyed', () =>
        {
            const sprite = new TilingSprite();

            expect(() => sprite.destroy()).not.toThrow();
        });

        it('should clean up correctly on the pipe and system when destroyed using simple render', async () =>
        {
            const renderer = await getWebGLRenderer();

            const container = new Container();

            const sprite = new TilingSprite({
                texture: getTexture({ width: 256, height: 256 })
            });

            container.addChild(sprite);

            renderer.render({ container });

            const renderData = renderer.renderPipes.tilingSprite['_tilingSpriteDataHash'][sprite.uid];

            expect(renderData).not.toBeNull();

            expect(renderData.shader).toBeUndefined();
            expect(renderData.batchableMesh).not.toBeNull();

            sprite.texture = getTexture({ width: 10, height: 10 });

            renderer.render({ container });

            expect(renderData.shader).not.toBeNull();

            sprite.destroy();

            expect(renderer.renderPipes.tilingSprite['_tilingSpriteDataHash'][sprite.uid]).toBeNull();

            expect(sprite.texture).toBeNull();
        });

        it('should global bounds to be correct', async () =>
        {
            const sprite = new TilingSprite({
                texture: getTexture({ width: 256, height: 256 })
            });

            const bounds = getGlobalBounds(sprite, true, new Bounds());

            expect(bounds.minX).toBe(0);
            expect(bounds.maxX).toBe(256);
            expect(bounds.minY).toBe(0);
            expect(bounds.maxY).toBe(256);
        });

        afterEach(() =>
            {
                writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
            });
    });

    afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });

    describe('ClampMargin', () =>
    {
        it('should clamp margin correctly', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            sprite.clampMargin = 10;

            expect(sprite.clampMargin).toEqual(10);
        });

        it('should get and set tilerotation correctly', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            expect(sprite.tileRotation).toEqual(0);

            sprite.tileRotation = 1;

            expect(sprite.tileRotation).toEqual(1);
        });

        it('should return the tiletransform position', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            sprite.tileTransform.position.set(10, 20);

            expect(sprite.tileTransform.position.x).toEqual(10);
            expect(sprite.tileTransform.position.y).toEqual(20);
        });

        it('should get and set roundPixels correctly', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            expect(sprite.roundPixels).toEqual(false);

            sprite.roundPixels = true;

            expect(sprite.roundPixels).toEqual(true);
        });

        describe('Constructor', () =>
        {
            it('should set width and height correctly when more than one argument is provided', () => {
                const texture = new Texture();
                const sprite = new TilingSprite(texture, 100, 200);

                expect(sprite.width).toBe(100);
                expect(sprite.height).toBe(200);
            });

            it('should set default width and height when only one argument is provided', () =>
            {
                const texture = new Texture();
                const sprite = setup({ texture });

                expect(sprite.width).toEqual(256);
                expect(sprite.height).toEqual(256);
            });

            it('should apply the provided options when creating a new TilingSprite', () =>
            {
                const texture = new Texture();
                const options = { width: 100, height: 200 };
                const sprite = TilingSprite.from(texture, options);

                expect(sprite.width).toBe(options.width);
                expect(sprite.height).toBe(options.height);
            });

            it('should create a new TilingSprite from a Texture', () =>
            {
                const texture = new Texture();
                const sprite = TilingSprite.from(texture);

                expect(sprite.texture).toBe(texture);
            });

            afterEach(() =>
                {
                    writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
                });
        });

        afterEach(() =>
            {
                writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
            });

        describe('Destroy', () =>
        {
            it('should destroy the texture when destroyTexture is true', () =>
            {
                const texture = new Texture();
                const destroySpy = jest.spyOn(texture, 'destroy');
                const sprite = new TilingSprite(texture);

                sprite.destroy(true);

                expect(destroySpy).toHaveBeenCalledWith(true);
            });

            it('should not destroy the texture when destroyTexture is false', () =>
            {
                const texture = new Texture();
                const destroySpy = jest.spyOn(texture, 'destroy');
                const sprite = new TilingSprite(texture);

                sprite.destroy(false);

                expect(destroySpy).not.toHaveBeenCalled();
            });

            it('should destroy the texture with textureSource option when provided', () =>
            {
                const texture = new Texture();
                const sprite = new TilingSprite(texture);

                sprite.destroy({ textureSource: true });

                expect(sprite.texture).toBeNull();
            });

            afterEach(() =>
                {
                    writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
                });
        }); 

        afterEach(() =>
            {
                writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
            });
    });

    afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });

    describe('Geometry', () =>
    {
        it('should calculate correct bounds when transformed', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            sprite.anchor.set(0.5, 0.5);
            sprite.scale.set(-2, 2);
            sprite.position.set(50, 40);

            const bounds = sprite.getBounds();

            expect(bounds.x).toEqual(-150);
            expect(bounds.y).toEqual(-260);
            expect(bounds.width).toEqual(400);
            expect(bounds.height).toEqual(600);
        });

        it('should check whether contains point correctly', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            // note: containsPoint works in local coords
            expect(sprite.containsPoint(new Point(0, 0))).toEqual(true);
            expect(sprite.containsPoint(new Point(100, 150))).toEqual(true);
            expect(sprite.containsPoint(new Point(200, 300))).toEqual(true);
            expect(sprite.containsPoint(new Point(201, 301))).toEqual(false);
            expect(sprite.containsPoint(new Point(-1, -1))).toEqual(false);
        });

        it('should check whether contains point correctly when anchor is set', () =>
        {
            const sprite = setup({ width: 200, height: 300, anchor: { x: 0.5, y: 0.5 } });

            // note: containsPoint works in local coords
            expect(sprite.containsPoint(new Point(0, 0))).toEqual(true);
            expect(sprite.containsPoint(new Point(100, 150))).toEqual(true);
            expect(sprite.containsPoint(new Point(200 / 2, 300 / 2))).toEqual(true);
            expect(sprite.containsPoint(new Point(201 / 2, 301 / 2))).toEqual(false);
            expect(sprite.containsPoint(new Point(-1, -1))).toEqual(true);
        });

        it('should get and set height & width correctly', () =>
        {
            const sprite = setup({ width: 200, height: 300 });

            expect(sprite.width).toEqual(200);
            expect(sprite.height).toEqual(300);

            sprite.width = 400;
            sprite.height = 600;

            expect(sprite.width).toEqual(400);
            expect(sprite.height).toEqual(600);
        });
    });

    afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });

    describe('Texture Construction', () =>
    {
        it('should build from given texture', () =>
        {
            const texture = new Texture();
            const sprite = setup({ texture });

            expect(sprite.texture).toEqual(texture);
        });

        it('should use empty texture when no texture passed', () =>
        {
            const tilingSprite = new TilingSprite({
                width: 1,
                height: 1,
            });

            expect(tilingSprite.texture).toEqual(Texture.EMPTY);
        });

        afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
        });
    });

    afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });

    describe('Anchor', () =>
    {
        it('should update anchor', () =>
        {
            const texture = new Texture();
            const sprite = setup({ texture });

            expect(sprite.texture).toEqual(texture);

            const spy = jest.spyOn(sprite, 'onViewUpdate');

            sprite.anchor.x = 0.5;

            expect(spy).toHaveBeenCalledTimes(1);
        });

        afterEach(() =>
            {
                writeFileSync('coverageResults.json', JSON.stringify(coverageResults,null,2));
            });
    });

    afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
    
});

afterEach(() =>
    {
        writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
    });
