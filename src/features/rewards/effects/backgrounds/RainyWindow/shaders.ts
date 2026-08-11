import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const rainyWindowFragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform float uAspect;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;

    ${glslNoise2D}

    float rainLayer(vec2 uv, float scale, float speed, float offset) {
        vec2 grid = uv * vec2(24.0 * scale, 6.0 * scale);
        vec2 cell = floor(grid);
        vec2 local = fract(grid);
        float seed = rewardHash(cell + offset);
        float fall = fract(local.y + uTime * speed + seed);
        float x = local.x - (0.18 + seed * 0.64);
        float head = 1.0 - smoothstep(0.0, 0.095, length(vec2(x, fall - 0.82) * vec2(1.0, 1.65)));
        float trail = (1.0 - smoothstep(0.0, 0.04, abs(x)))
            * (1.0 - smoothstep(0.18, 0.82, fall))
            * smoothstep(0.02, 0.16, fall);
        return head + trail * 0.46;
    }

    void main() {
        vec2 uv = vUv;
        vec2 rainUv = uv;
        rainUv.x *= uAspect;

        float closeRain = rainLayer(rainUv, 0.72, 0.12, 4.0);
        float middleRain = rainLayer(rainUv + vec2(0.13, 0.0), 1.18, 0.18, 11.0);
        float distantRain = rainLayer(rainUv + vec2(0.37, 0.0), 1.72, 0.24, 27.0);
        float droplets = closeRain * 0.72 + middleRain * 0.48 + distantRain * 0.25;

        float fog = rewardFbm(uv * vec2(2.4, 1.6) + vec2(uTime * 0.012, 0.0));
        float reflection = pow(max(0.0, sin((uv.x + fog * 0.12) * 10.0 - uTime * 0.08)), 12.0)
            * smoothstep(0.55, 1.0, uv.y);
        vec3 color = mix(uColorA, uColorB, clamp(uv.y + fog * 0.24, 0.0, 1.0));
        color += vec3(0.72, 0.9, 1.0) * droplets * 0.5;
        color += uColorB * reflection * 0.18;

        float edgeFade = smoothstep(0.0, 0.08, uv.x) * (1.0 - smoothstep(0.92, 1.0, uv.x));
        float alpha = (0.08 + fog * 0.08 + droplets * 0.52 + reflection * 0.08) * edgeFade;
        gl_FragColor = vec4(color, alpha);
    }
`
