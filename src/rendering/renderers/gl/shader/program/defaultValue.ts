import { coverageResults } from '../../../../../../customCoverageTool';

function booleanArray(size: number): Array<boolean>
{
    const array = new Array(size);

    for (let i = 0; i < array.length; i++)
    {
        array[i] = false;
    }

    return array;
}

/**
 * @method defaultValue
 * @param {string} type - Type of value
 * @param {number} size
 * @private
 */
export function defaultValue(
    type: string,
    size: number
): number | Float32Array | Int32Array | Uint32Array | boolean | boolean[]
{
    switch (type)
    {
        case 'float':
            coverageResults['defaultValue.float'] = true;
            return 0;

        case 'vec2':
            coverageResults['defaultValue.floatArray1'] = true;
            return new Float32Array(2 * size);

        case 'vec3':
            coverageResults['defaultValue.floatArray2'] = true;
            return new Float32Array(3 * size);

        case 'vec4':
            coverageResults['defaultValue.floatArray3'] = true;
            return new Float32Array(4 * size);

        case 'int':
        case 'uint':
        case 'sampler2D':
        case 'sampler2DArray':
            coverageResults['defaultValue.otherType'] = true;
            return 0;

        case 'ivec2':
            coverageResults['defaultValue.intArray1'] = true;
            return new Int32Array(2 * size);

        case 'ivec3':
            coverageResults['defaultValue.intArray2'] = true;
            return new Int32Array(3 * size);

        case 'ivec4':
            coverageResults['defaultValue.intArray3'] = true;
            return new Int32Array(4 * size);

        case 'uvec2':
            coverageResults['defaultValue.uintArray1'] = true;
            return new Uint32Array(2 * size);

        case 'uvec3':
            coverageResults['defaultValue.uintArray2'] = true;
            return new Uint32Array(3 * size);

        case 'uvec4':
            coverageResults['defaultValue.uintArray3'] = true;
            return new Uint32Array(4 * size);

        case 'bool':
            coverageResults['defaultValue.bool1'] = true;
            return false;

        case 'bvec2':
            coverageResults['defaultValue.boolArray1'] = true;
            return booleanArray(2 * size);

        case 'bvec3':
            coverageResults['defaultValue.boolArray2'] = true;
            return booleanArray(3 * size);

        case 'bvec4':
            coverageResults['defaultValue.boolArray3'] = true;
            return booleanArray(4 * size);

        case 'mat2':
            coverageResults['defaultValue.floatMatrix1'] = true;
            return new Float32Array([1, 0,
                0, 1]);

        case 'mat3':
            coverageResults['defaultValue.floatMatrix2'] = true;
            return new Float32Array([1, 0, 0,
                0, 1, 0,
                0, 0, 1]);

        case 'mat4':
            coverageResults['defaultValue.floatMatrix3'] = true;
            return new Float32Array([1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1]);
    }

    return null;
}
