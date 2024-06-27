import { Circle } from '../../src/maths/shapes/Circle';
import { Rectangle } from '../../src/maths/shapes/Rectangle';
import { writeFileSync } from 'fs-extra';
import { coverageResults } from '../../customCoverageTool';

describe('Circle', () => {
    it('should copy properties from another circle using copyFrom', () => {
        const circle1 = new Circle(10, 15, 5);
        const circle2 = new Circle(0, 0, 0);

        circle2.copyFrom(circle1);

        expect(circle2.x).toBe(10);
        expect(circle2.y).toBe(15);
        expect(circle2.radius).toBe(5);
    });

    it('should copy properties to another circle using copyTo', () => {
        const circle1 = new Circle(20, 25, 10);
        const circle2 = new Circle(0, 0, 0);

        circle1.copyTo(circle2);

        expect(circle2.x).toBe(20);
        expect(circle2.y).toBe(25);
        expect(circle2.radius).toBe(10);
    });

    it('should return a string representation of the circle using toString', () => {
        const circle = new Circle(5, 10, 15);
        const stringRepresentation = circle.toString();

        expect(stringRepresentation).toBe('[pixi.js/math:Circle x=5 y=10 radius=15]');
    });

    // Additional tests for clone, contains, strokeContains, and getBounds
    it('should clone a circle', () => {
        const circle = new Circle(5, 10, 15);
        const clone = circle.clone();

        expect(clone).toBeInstanceOf(Circle);
        expect(clone.x).toBe(5);
        expect(clone.y).toBe(10);
        expect(clone.radius).toBe(15);
    });

    it('should check if a point is within the circle', () => {
        const circle = new Circle(5, 5, 10);

        expect(circle.contains(5, 5)).toBe(true); // Point is at the center of the circle
        expect(circle.contains(5, 15)).toBe(true); // Point is on the edge of the circle
        expect(circle.contains(5, 16)).toBe(false); // Point is outside the circle
    });

    it('should check if a point is within the stroke of the circle', () => {
        const circle = new Circle(5, 5, 10);

        expect(circle.strokeContains(15, 5, 5)).toBe(true); // Point is within the stroke width
        expect(circle.strokeContains(15, 5, 20)).toBe(true); // Point is well within the stroke width
        expect(circle.strokeContains(5, 5, 0)).toBe(false); // No stroke width
    });

    it('should return the framing rectangle of the circle', () => {
        const circle = new Circle(5, 5, 10);
        const bounds = circle.getBounds();

        expect(bounds).toBeInstanceOf(Rectangle);
        expect(bounds.x).toBe(-5);
        expect(bounds.y).toBe(-5);
        expect(bounds.width).toBe(20);
        expect(bounds.height).toBe(20);
    });

    afterEach(() => {
        writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
    });
});
