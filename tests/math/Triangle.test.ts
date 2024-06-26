import { Rectangle } from '../../src/maths/shapes/Rectangle';
import { Triangle } from '../../src/maths/shapes/Triangle';
import { coverageResults } from '../../customCoverageTool';
import { writeFileSync } from 'fs';

describe('Triangle', () =>
{
    it('returning correct values for default triangle', () =>
    {
        const triangle = new Triangle();

        expect(triangle.x).toBe(0);
        expect(triangle.y).toBe(0);
        expect(triangle.x2).toBe(0);
        expect(triangle.y2).toBe(0);
        expect(triangle.x3).toBe(0);
        expect(triangle.y3).toBe(0);
    });

    it('return triangle with specific values', () =>
    {
        const triangle = new Triangle(12, 13, 4, 3, 5, 13);

        expect(triangle.x).toBe(12);
        expect(triangle.y).toBe(13);
        expect(triangle.x2).toBe(4);
        expect(triangle.y2).toBe(3);
        expect(triangle.x3).toBe(5);
        expect(triangle.y3).toBe(13);
    });

    it('returning if triangle contains a given point', () =>
    {
        const triangle = new Triangle(0, 0, 10, 0, 5, 5);
        const triangle2 = new Triangle(0, 0, 5, 0, 0, 5);

        expect(triangle.contains(5, 2)).toBe(true);
        expect(triangle.contains(15, 15)).toBe(false);
        expect(triangle2.contains(2, -1)).toBe(false);
    });

    it('returning if triangle contains stroke', () =>
    {
        const triangle = new Triangle(0, 0, 10, 0, 5, 5);

        expect(triangle.strokeContains(5, 0, 1)).toBe(true);
        expect(triangle.strokeContains(5, 5, 1)).toBe(false);
    });

    it('returning clone of a given triangle', () =>
    {
        const triangle = new Triangle(12, 13, 4, 3, 5, 13);
        const clone = triangle.clone();

        expect(clone).toEqual(triangle);
    });

    it('should copy from another triangle correctly', () =>
    {
        const triangle1 = new Triangle(12, 13, 4, 3, 5, 13);
        const triangle2 = new Triangle();

        triangle2.copyFrom(triangle1);

        expect(triangle2).toEqual(triangle1);
    });

    it('should copy to another triangle correctly', () =>
    {
        const triangle1 = new Triangle(12, 13, 4, 3, 5, 13);
        const triangle2 = new Triangle();

        triangle1.copyTo(triangle2);

        expect(triangle2).toEqual(triangle1);
    });

    it('returns correct getBounds() triangle', () =>
    {
        const triangle = new Triangle(12, 13, 4, 3, 5, 13);
        const bounds = triangle.getBounds();
        const expectRectangle = new Rectangle(4, 3, 8, 10);

        expect(bounds).toEqual(expectRectangle);
    });
    afterEach(() =>
    {
        writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
    });
});
