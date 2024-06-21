import { RoundedRectangle } from '../../src/maths/shapes/RoundedRectangle';

describe('RoundedRectangle', () =>
{
    it('should create a new rounded rectangle', () =>
    {
        const rrect = new RoundedRectangle(5, 5, 1, 1);

        expect(rrect.x).toEqual(5);
        expect(rrect.y).toEqual(5);
        expect(rrect.width).toEqual(1);
        expect(rrect.height).toEqual(1);
        expect(rrect.radius).toEqual(20);
    });

    it('should clone a new rounded rectangle', () =>
    {
        const rrect1 = new RoundedRectangle(0, 0, 100, 100, 40);

        expect(rrect1.x).toEqual(0);
        expect(rrect1.y).toEqual(0);
        expect(rrect1.width).toEqual(100);
        expect(rrect1.height).toEqual(100);
        expect(rrect1.radius).toEqual(40);

        const rrect2 = rrect1.clone();

        expect(rrect2.x).toEqual(0);
        expect(rrect2.y).toEqual(0);
        expect(rrect2.width).toEqual(100);
        expect(rrect2.height).toEqual(100);
        expect(rrect2.radius).toEqual(40);
        expect(rrect1).not.toBe(rrect2);
    });

    it('should check if point is within rounded rectangle', () =>
    {
        const rrect1 = new RoundedRectangle(0, 0, 200, 200, 50);

        expect(rrect1.contains(50, 50)).toBe(true);
        expect(rrect1.contains(5, 100)).toBe(true);
        expect(rrect1.contains(100, 5)).toBe(true);
        expect(rrect1.contains(195, 100)).toBe(true);
        expect(rrect1.contains(100, 195)).toBe(true);
        expect(rrect1.contains(20, 20)).toBe(true);
        expect(rrect1.contains(180, 20)).toBe(true);
        expect(rrect1.contains(180, 180)).toBe(true);
        expect(rrect1.contains(20, 180)).toBe(true);
        expect(rrect1.contains(10, 10)).toBe(false);
        expect(rrect1.contains(190, 10)).toBe(false);
        expect(rrect1.contains(190, 190)).toBe(false);
        expect(rrect1.contains(10, 190)).toBe(false);

        const rrect2 = new RoundedRectangle(0, 0, 10, 0, 1);

        expect(rrect2.contains(0, 0)).toBe(false);

        const rrect3 = new RoundedRectangle(0, 0, 0, 10, 1);

        expect(rrect3.contains(0, 0)).toBe(false);

        const rrect4 = new RoundedRectangle(0, 0, 10, 10, 1000);

        expect(rrect4.contains(5, 5)).toBe(true);
    });

    // Andras 6
    it('should copy from another rounded rectangle', () =>
    {
        const rrect1 = new RoundedRectangle(0, 0, 100, 100, 40);
        const rrect2 = new RoundedRectangle(5, 5, 1, 1, 1);

        rrect2.copyFrom(rrect1);

        expect(rrect2.x).toEqual(0);
        expect(rrect2.y).toEqual(0);
        expect(rrect2.width).toEqual(100);
        expect(rrect2.height).toEqual(100);
        expect(rrect2.radius).toEqual(40);
    });

    // Andras 7
    it('should copy to another rounded rectangle', () =>
    {
        const rrect1 = new RoundedRectangle(0, 0, 100, 100, 40);
        const rrect2 = new RoundedRectangle(5, 5, 1, 1, 1);

        rrect1.copyTo(rrect2);

        expect(rrect2.x).toEqual(0);
        expect(rrect2.y).toEqual(0);
        expect(rrect2.width).toEqual(100);
        expect(rrect2.height).toEqual(100);
        expect(rrect2.radius).toEqual(40);
    });

    // Andras 8
    it('should get the bounds of the rounded rectangle', () =>
    {
        const rrect = new RoundedRectangle(5, 5, 1, 1);

        const bounds = rrect.getBounds();

        expect(bounds.x).toEqual(5);
        expect(bounds.y).toEqual(5);
        expect(bounds.width).toEqual(1);
        expect(bounds.height).toEqual(1);
    });

    // Andras 9
    it('should correctly determine if a point is within the stroke of the rectangle', () =>
    {
        const rectangle = new RoundedRectangle();

        rectangle.x = 0;
        rectangle.y = 0;
        rectangle.width = 10;
        rectangle.height = 10;
        rectangle.radius = 2;

        const strokeWidth = 2;

        expect(rectangle.strokeContains(1, 1, strokeWidth)).toBe(true);
        expect(rectangle.strokeContains(12, 12, strokeWidth)).toBe(false);
    });
});
