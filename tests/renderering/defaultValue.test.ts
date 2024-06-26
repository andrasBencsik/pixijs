import { defaultValue } from '../../src/rendering/renderers/gl/shader/program/defaultValue';
import { coverageResults } from '../../customCoverageTool';
import { writeFileSync } from 'fs';

describe('defaultValue', () =>
{
    it('return 0 for type "float"', () =>
    {
        expect(defaultValue('float', 1)).toBe(0);
    });

    it('returning correct sizes for Float32Arrays', () =>
    {
        expect(defaultValue('vec2', 1)).toEqual(new Float32Array(2));
        expect(defaultValue('vec2', 2)).toEqual(new Float32Array(4));
        expect(defaultValue('vec3', 1)).toEqual(new Float32Array(3));
        expect(defaultValue('vec3', 2)).toEqual(new Float32Array(6));
        expect(defaultValue('vec4', 1)).toEqual(new Float32Array(4));
        expect(defaultValue('vec4', 2)).toEqual(new Float32Array(8));
    });

    it('return 0 for type "int" and "uint"', () =>
    {
        expect(defaultValue('int', 1)).toBe(0);
        expect(defaultValue('uint', 1)).toBe(0);
    });

    it('returning correct sizes for Int32Arrays', () =>
    {
        expect(defaultValue('ivec2', 1)).toEqual(new Int32Array(2));
        expect(defaultValue('ivec2', 2)).toEqual(new Int32Array(4));
        expect(defaultValue('ivec3', 1)).toEqual(new Int32Array(3));
        expect(defaultValue('ivec3', 2)).toEqual(new Int32Array(6));
        expect(defaultValue('ivec4', 1)).toEqual(new Int32Array(4));
        expect(defaultValue('ivec4', 2)).toEqual(new Int32Array(8));
    });

    it('returning correct sizes for type Uint32Arrays', () =>
    {
        expect(defaultValue('uvec2', 1)).toEqual(new Uint32Array(2));
        expect(defaultValue('uvec2', 2)).toEqual(new Uint32Array(4));
        expect(defaultValue('uvec3', 1)).toEqual(new Uint32Array(3));
        expect(defaultValue('uvec3', 2)).toEqual(new Uint32Array(6));
        expect(defaultValue('uvec4', 1)).toEqual(new Uint32Array(4));
        expect(defaultValue('uvec4', 2)).toEqual(new Uint32Array(8));
    });

    it('return false for type "bool" and boolean arrays', () =>
    {
        expect(defaultValue('bool', 1)).toBe(false);
        expect(defaultValue('bvec2', 1)).toEqual([false, false]);
        expect(defaultValue('bvec3', 1)).toEqual([false, false, false]);
        expect(defaultValue('bvec4', 1)).toEqual([false, false, false, false]);
    });

    it('return Float32Arrays', () =>
    {
        expect(defaultValue('mat2', 1)).toEqual(new Float32Array([1, 0, 0, 1]));
        expect(defaultValue('mat3', 1)).toEqual(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
        expect(defaultValue('mat4', 1)).toEqual(new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    });

    it('return null for unknown type', () =>
    {
        expect(defaultValue('unknown', 1)).toBeNull();
    });
    afterEach(() =>
    {
        writeFileSync('coverageResults.json', JSON.stringify(coverageResults, null, 2));
    });
});
