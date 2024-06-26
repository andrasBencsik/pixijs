import { Container } from '../../src/scene/container/Container';
import { Matrix } from '../../src/maths/matrix/Matrix';
import { PointData } from '../../src/maths/point/PointData';
import { writeFileSync } from 'fs-extra';
import { coverageResults } from '../../customCoverageTool';

describe('Container', () =>
{
    describe('constructor', () =>
    {
        it('should initialise properties', () =>
        {
            const object = new Container();

            expect(object.alpha).toEqual(1);
            expect(object.groupColor).toEqual(0xffffff);
            expect(object.renderable).toBe(true);
            expect(object.visible).toBe(true);
        });

        // Andras 1
        it('should initialise height & width correctly', () =>
        {
            const container = new Container();

            expect(container.width).toEqual(0);
            expect(container.height).toEqual(0);

            const initialWidth = container.width;
            const initialHeight = container.height;

            container.width = 100;
            container.height = 200;

            const expectedWidth = initialWidth * container.scale.x;
            const expectedHeight = initialHeight * container.scale.y;

            expect(container.width).toEqual(expectedWidth);
            expect(container.height).toEqual(expectedHeight);
        });

        // Andras 2
        it('should get and set correctly', () =>
        {
            const container = new Container();

            let size = container.getSize();

            expect(size.width).toEqual(0);
            expect(size.height).toEqual(0);

            const initialWidth = size.width;
            const initialHeight = size.height;

            container.setSize(100, 200);
            size = container.getSize();

            const expectedWidth = initialWidth * container.scale.x;
            const expectedHeight = initialHeight * container.scale.y;

            expect(size.width).toEqual(expectedWidth);
            expect(size.height).toEqual(expectedHeight);
        });

        // Andras 3
        it('should set pivot correctly when a number is passed', () =>
        {
            const container = new Container();

            container.pivot = 100;

            expect(container.pivot.x).toEqual(100);
            expect(container.pivot.y).toEqual(100);
        });

        // Andras 4
        it('should set pivot correctly when a point is passed', () =>
        {
            const container = new Container();
            const point: PointData = { x: 100, y: 200 };

            container.pivot = point;

            expect(container.pivot.x).toEqual(100);
            expect(container.pivot.y).toEqual(200);
        });

        // Andras 5
        it('should copyFrom point to skew correctly', () =>
        {
            const container = new Container();
            const point: PointData = { x: 3, y: 4 };

            container.skew = point;

            expect(container.skew.x).toEqual(3);
            expect(container.skew.y).toEqual(4);
        });

        // Andras 6
        it('should correctly set the scale of the container', () =>
        {
            const container = new Container();

            container.scale = 2;
            expect(container.scale.x).toEqual(2);
            expect(container.scale.y).toEqual(2);

            const point: PointData = { x: 3, y: 4 };

            container.scale = point;
            expect(container.scale.x).toEqual(point.x);
            expect(container.scale.y).toEqual(point.y);
        });

        afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
    });

    // Test Suite - Andras
    describe('setFromMatrix', () =>
    {
        // Andras 7
        it('should decompose the matrix into the container', () =>
        {
            const container = new Container();
            const matrix = new Matrix();

            matrix.a = 1;
            matrix.b = 2;
            matrix.c = 3;
            matrix.d = 4;
            matrix.tx = 5;
            matrix.ty = 6;

            container.setFromMatrix(matrix);

            const skewX = -Math.atan2(-matrix.c, matrix.d);
            const skewY = Math.atan2(matrix.b, matrix.a);

            const delta = Math.abs(skewX + skewY);
            const PI_2 = Math.PI / 2;
            const expectedRotation = (delta < 0.00001 || Math.abs(PI_2 - delta) < 0.00001) ? skewY : 0;

            expect(container.position.x).toEqual(matrix.tx);
            expect(container.position.y).toEqual(matrix.ty);
            expect(container.scale.x).toEqual(Math.sqrt((matrix.a * matrix.a) + (matrix.b * matrix.b)));
            expect(container.scale.y).toEqual(Math.sqrt((matrix.c * matrix.c) + (matrix.d * matrix.d)));
            expect(container.rotation).toEqual(expectedRotation);
        });

        afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
    });

    describe('setTransform', () =>
    {
        it('should set correct properties', () =>
        {
            const object = new Container();

            object.updateTransform({
                x: 1,
                y: 2,
                scaleX: 3,
                scaleY: 4,
                rotation: 5,
                skewX: 6,
                skewY: 7,
                pivotX: 8,
                pivotY: 9,
            });

            expect(object.position.x).toEqual(1);
            expect(object.position.y).toEqual(2);
            expect(object.scale.x).toEqual(3);
            expect(object.scale.y).toEqual(4);
            expect(object.rotation).toEqual(5);
            expect(object.skew.x).toEqual(6);
            expect(object.skew.y).toEqual(7);
            expect(object.pivot.x).toEqual(8);
            expect(object.pivot.y).toEqual(9);
        });

        it('should convert zero scale to one', () =>
        {
            const object = new Container();

            object.updateTransform({
                scaleX: 0,
                scaleY: 0,
            });

            expect(object.scale.x).toEqual(1);
            expect(object.scale.y).toEqual(1);
        });

        afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
    });

    describe('destroy', () =>
    {
        it('should not destroy children by default', () =>
        {
            const container = new Container();
            const child = new Container();

            container.addChild(child);
            container.destroy();

            expect(container.children.length).toEqual(0);
            expect(container.destroyed).toBe(true);
            expect(child.destroyed).toBe(false);
        });

        it('should allow children destroy with option', () =>
        {
            const container = new Container();
            const child = new Container();

            container.addChild(child);
            container.destroy({ children: true });

            expect(container.children.length).toEqual(0);
            expect(container.destroyed).toBeTrue();
            expect(child.destroyed).toBeTrue();
        });

        it('should allow children destroy with boolean', () =>
        {
            const container = new Container();
            const child = new Container();

            container.addChild(child);
            container.destroy(true);

            expect(container.children.length).toEqual(0);
            expect(container.destroyed).toBeTrue();
            expect(child.destroyed).toBeTrue();
        });

        afterEach(() =>
        {
            writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
        });
    });
});
