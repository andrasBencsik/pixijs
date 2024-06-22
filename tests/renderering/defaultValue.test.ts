import { defaultValue } from '../../src/rendering/renderers/gl/shader/program/defaultValue';

describe('defaultValue', () =>
{
    it('return 0 for type "float"', () =>
    {
        expect(defaultValue('float', 1)).toBe(0);
    });

    it('returning correct sizes for type "vec2"', () =>
    {
        expect(defaultValue('vec2', 1)).toEqual(new Float32Array(2));
        expect(defaultValue('vec2', 2)).toEqual(new Float32Array(4));
    });

    it('returning correct sizes for type "vec3"', () =>
    {
        expect(defaultValue('vec3', 1)).toEqual(new Float32Array(3));
        expect(defaultValue('vec3', 2)).toEqual(new Float32Array(6));
    });

    it('returning correct sizes for type "vec4"', () =>
    {
        expect(defaultValue('vec4', 1)).toEqual(new Float32Array(4));
        expect(defaultValue('vec4', 2)).toEqual(new Float32Array(8));
    });

    it('return 0 for type "int"', () =>
    {
        expect(defaultValue('int', 1)).toBe(0);
    });

    it('return 0 for type "uint"', () =>
    {
        expect(defaultValue('uint', 1)).toBe(0);
    });

    it('returning correct sizes for type "ivec2"', () =>
    {
        expect(defaultValue('ivec2', 1)).toEqual(new Int32Array(2));
        expect(defaultValue('ivec2', 2)).toEqual(new Int32Array(4));
    });

    it('returning correct sizes for type "ivec3"', () =>
    {
        expect(defaultValue('ivec3', 1)).toEqual(new Int32Array(3));
        expect(defaultValue('ivec3', 2)).toEqual(new Int32Array(6));
    });

    it('returning correct sizes for type "ivec4"', () =>
    {
        expect(defaultValue('ivec4', 1)).toEqual(new Int32Array(4));
        expect(defaultValue('ivec4', 2)).toEqual(new Int32Array(8));
    });

    it('returning correct sizes for type "uvec2"', () =>
    {
        expect(defaultValue('uvec2', 1)).toEqual(new Uint32Array(2));
        expect(defaultValue('uvec2', 2)).toEqual(new Uint32Array(4));
    });

    it('returning correct sizes for type "uvec3"', () =>
    {
        expect(defaultValue('uvec3', 1)).toEqual(new Uint32Array(3));
        expect(defaultValue('uvec3', 2)).toEqual(new Uint32Array(6));
    });

    it('returning correct sizes for type "uvec4"', () =>
    {
        expect(defaultValue('uvec4', 1)).toEqual(new Uint32Array(4));
        expect(defaultValue('uvec4', 2)).toEqual(new Uint32Array(8));
    });

    it('return false for type "bool"', () =>
    {
        expect(defaultValue('bool', 1)).toBe(false);
    });

    it('return boolean array of correct size for type "bvec2"', () =>
    {
        expect(defaultValue('bvec2', 1)).toEqual([false, false]);
    });

    it('return boolean array of correct size for type "bvec3"', () =>
    {
        expect(defaultValue('bvec3', 1)).toEqual([false, false, false]);
    });

    it('return boolean array of correct size for type "bvec4"', () =>
    {
        expect(defaultValue('bvec4', 1)).toEqual([false, false, false, false]);
    });

    it('return Float32Array for type "mat2"', () =>
    {
        expect(defaultValue('mat2', 1)).toEqual(new Float32Array([1, 0, 0, 1]));
    });

    it('return Float32Array for type "mat3"', () =>
    {
        expect(defaultValue('mat3', 1)).toEqual(new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]));
    });

    it('return Float32Array for type "mat4"', () =>
    {
        expect(defaultValue('mat4', 1)).toEqual(new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
    });

    it('return null for unknown type', () =>
    {
        expect(defaultValue('unknown', 1)).toBeNull();
    });
});
