export const glslNoise2D = `
    float rewardHash(vec2 point) {
        return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float rewardNoise(vec2 point) {
        vec2 cell = floor(point);
        vec2 local = fract(point);
        local = local * local * (3.0 - 2.0 * local);

        float a = rewardHash(cell);
        float b = rewardHash(cell + vec2(1.0, 0.0));
        float c = rewardHash(cell + vec2(0.0, 1.0));
        float d = rewardHash(cell + vec2(1.0, 1.0));

        return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
    }

    float rewardFbm(vec2 point) {
        float value = 0.0;
        float amplitude = 0.5;

        for (int octave = 0; octave < 5; octave++) {
            value += amplitude * rewardNoise(point);
            point = point * 2.03 + vec2(17.3, 9.2);
            amplitude *= 0.5;
        }

        return value;
    }
`
