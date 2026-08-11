import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const cosmicRibbonsFragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform float uAspect;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;

    ${glslNoise2D}

    float ribbon(vec2 point, float offset, float frequency, float width) {
        float distortion = rewardFbm(point * 0.72 + vec2(uTime * 0.055, offset)) - 0.5;
        float center = sin(point.x * frequency + uTime * 0.22 + offset) * 0.16
            + sin(point.x * 1.7 - uTime * 0.13) * 0.09
            + distortion * 0.34;
        return exp(-abs(point.y - center - offset * 0.08) / width);
    }

    void main() {
        vec2 point = vUv - 0.5;
        point.x *= uAspect;
        point *= 1.2;

        float first = ribbon(point, -1.1, 2.2, 0.055);
        float second = ribbon(point.yx * vec2(0.92, 1.0), 0.7, 2.7, 0.045);
        float third = ribbon(point, 1.9, 1.6, 0.034);
        float nebula = rewardFbm(point * 1.45 + vec2(-uTime * 0.025, uTime * 0.018));

        vec3 color = uColorA * first + uColorB * second + uColorC * third;
        color += mix(uColorA, uColorB, nebula) * pow(nebula, 3.4) * 0.34;

        vec2 starCell = floor((point + 2.0) * 55.0);
        float starSeed = rewardHash(starCell);
        float stars = step(0.986, starSeed) * (0.45 + 0.55 * sin(uTime * 0.8 + starSeed * 18.0));
        color += vec3(stars * 0.42);

        float vignette = 1.0 - smoothstep(0.42, 1.05, length(point));
        float alpha = clamp((first + second + third) * 0.22 + nebula * 0.08 + stars * 0.3, 0.0, 0.72) * vignette;
        gl_FragColor = vec4(color, alpha);
    }
`
