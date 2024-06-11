import { getGlobalRenderableBounds } from '../../src/scene/container/bounds/getRenderableBounds'; // Adjust the path accordingly
import { Bounds } from '../../src/scene/container/bounds/Bounds'; // Adjust the path accordingly

import type { Renderable } from '../../src/rendering/renderers/shared/Renderable'; 

// Mock Renderable class
class MockRenderable implements Renderable {
    uid: number;
    batched: boolean;
    renderPipeId: string;
    _roundPixels: 0 | 1;
    bounds: BoundsData;
    globalDisplayStatus: number;
    worldTransform: any;

    constructor(globalDisplayStatus: number, worldTransform: any) {
        this.uid = 1;
        this.batched = false;
        this.renderPipeId = 'mock';
        this._roundPixels = 0;
        this.bounds = { minX: -50, minY: -50, maxX: 50, maxY: 50 };
        this.globalDisplayStatus = globalDisplayStatus;
        this.worldTransform = worldTransform;
    }

    get roundPixels(): boolean {
        return this._roundPixels === 1;
    }

    set roundPixels(value: boolean) {
        this._roundPixels = value ? 1 : 0;
    }

    addBounds(bounds: Bounds): void {
        bounds.minX = Math.min(bounds.minX, this.bounds.minX);
        bounds.minY = Math.min(bounds.minY, this.bounds.minY);
        bounds.maxX = Math.max(bounds.maxX, this.bounds.maxX);
        bounds.maxY = Math.max(bounds.maxY, this.bounds.maxY);
    }

    containsPoint(point: Point): boolean {
        return false;
    }
}

describe('getGlobalRenderableBounds', () => {
    it('should correctly calculate bounds when globalDisplayStatus is >= 0b111', () => {
        const renderables: Renderable[] = [
            new MockRenderable(0b111, { a: 1 }), // true
            new MockRenderable(0b101, { a: 1 }), // false
            new MockRenderable(0b111, { a: 1 })  // true
        ];
        const bounds = new Bounds();

        const result = getGlobalRenderableBounds(renderables, bounds);

        expect(result.minX).toBe(-50);
        expect(result.minY).toBe(-50);
        expect(result.maxX).toBe(50);
        expect(result.maxY).toBe(50);
    });

    it('should skip renderables with globalDisplayStatus < 0b111', () => {
        const renderables: Renderable[] = [
            new MockRenderable(0b110, { a: 1 }), // false
            new MockRenderable(0b100, { a: 1 })  // false
        ];
        const bounds = new Bounds();

        const result = getGlobalRenderableBounds(renderables, bounds);

        // Bounds should not be modified
        expect(result.minX).toBe(Infinity);
        expect(result.minY).toBe(Infinity);
        expect(result.maxX).toBe(-Infinity);
        expect(result.maxY).toBe(-Infinity);
    });

    it('should restore the matrix after updating bounds', () => {
        const renderables: Renderable[] = [
            new MockRenderable(0b111, { a: 2 })
        ];
        const bounds = new Bounds();
        const originalMatrix = bounds.matrix;

        getGlobalRenderableBounds(renderables, bounds);

        expect(bounds.matrix).toBe(originalMatrix);
    });

    it('should handle an empty array of renderables', () => {
        const renderables: Renderable[] = [];
        const bounds = new Bounds();

        const result = getGlobalRenderableBounds(renderables, bounds);

        expect(result.minX).toBe(Infinity);
        expect(result.minY).toBe(Infinity);
        expect(result.maxX).toBe(-Infinity);
        expect(result.maxY).toBe(-Infinity);
    });
});
