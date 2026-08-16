import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const orbitalNebulaFragmentShader = `
    precision highp float;

    ${glslNoise2D}

    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;
    uniform float uLightMode;
    uniform float uStarScale;
    uniform vec3 uColorCore;
    uniform vec3 uColorCool;
    uniform vec3 uColorWarm;
    uniform vec3 uColorDust;
    varying vec2 vUv;

    mat2 rotate2d(float angle) {
        float sine = sin(angle);
        float cosine = cos(angle);
        return mat2(cosine, -sine, sine, cosine);
    }

    float orbitalBand(float radius, float target, float width) {
        return exp(-pow(abs(radius - target) / width, 2.0));
    }

    float starField(vec2 point, float scale, float threshold) {
        vec2 gridPoint = point * scale;
        vec2 cell = floor(gridPoint);
        vec2 localPoint = fract(gridPoint) - 0.5;
        float seed = rewardHash(cell);
        vec2 offset = vec2(
            rewardHash(cell + vec2(3.7, 8.1)),
            rewardHash(cell + vec2(9.2, 2.4))
        ) - 0.5;
        float radius = mix(0.024, 0.066, rewardHash(cell + 4.6));
        float star = 1.0 - smoothstep(radius * 0.18, radius, length(localPoint - offset * 0.74));
        float twinkle = 0.76 + 0.24 * sin(uTime * 0.64 + seed * 19.0);
        return star * step(threshold, seed) * twinkle;
    }

    void main() {
        vec2 point = vUv * 2.0 - 1.0;
        point.x *= uAspect;

        float centerX = min(uAspect * 0.34, 0.62);
        vec2 centered = point - vec2(centerX, 0.26);
        centered = rotate2d(-0.17 + uTime * 0.007) * centered;
        vec2 orbitalPoint = vec2(centered.x, centered.y * 1.72);
        float orbitalRadius = length(orbitalPoint);
        float orbitalAngle = atan(orbitalPoint.y, orbitalPoint.x);

        vec2 swirlPoint = rotate2d(
            orbitalRadius * 0.7 - uTime * 0.026
        ) * orbitalPoint;
        float broadCloud = rewardFbm(
            swirlPoint * 1.18 + vec2(uTime * 0.012, -uTime * 0.009)
        );
        float cloudDetail = rewardFbm(
            swirlPoint * 2.65 - vec2(uTime * 0.018, uTime * 0.011)
        );
        float spiralWave = 0.5 + 0.5 * cos(
            orbitalAngle * 2.0
            - orbitalRadius * 7.2
            + broadCloud * 3.1
            - uTime * 0.08
        );
        float spiralArms = pow(spiralWave, 3.2) * (0.36 + cloudDetail * 0.64);
        float envelope = exp(-orbitalRadius * 0.9)
            * (1.0 - smoothstep(1.3, 1.76, orbitalRadius));
        float gas = envelope * (
            0.12
            + broadCloud * 0.34
            + spiralArms * 0.96
        );
        gas *= 0.78 + 0.22 * smoothstep(0.2, 0.74, cloudDetail);
        float diffuseGas = exp(-pow(orbitalRadius / 1.16, 2.0))
            * (0.16 + broadCloud * 0.3)
            * (0.58 + spiralWave * 0.42)
            * (1.0 - smoothstep(1.22, 1.64, orbitalRadius));
        gas += diffuseGas;

        float coreGlow = exp(-orbitalRadius * 5.2);
        float coreLight = exp(-orbitalRadius * 13.5);

        float orbitNoise = (broadCloud - 0.5) * 0.022;
        float gapPattern = 0.38 + 0.62 * smoothstep(
            0.18,
            0.84,
            0.5 + 0.5 * sin(orbitalAngle * 3.0 + cloudDetail * 4.2)
        );
        float innerOrbit = orbitalBand(orbitalRadius + orbitNoise, 0.48, 0.013) * gapPattern;
        float middleOrbit = orbitalBand(orbitalRadius - orbitNoise, 0.78, 0.011)
            * (0.32 + 0.68 * cloudDetail);
        float outerOrbit = orbitalBand(orbitalRadius + orbitNoise * 0.6, 1.1, 0.008)
            * (0.2 + 0.8 * broadCloud);
        float orbitEnergy = innerOrbit * 0.55 + middleOrbit * 0.72 + outerOrbit * 0.42;

        vec2 rotatingDust = rotate2d(uTime * 0.02) * orbitalPoint;
        float dustMask = exp(-pow(abs(orbitalRadius - 0.78) / 0.28, 2.0))
            + exp(-pow(abs(orbitalRadius - 1.1) / 0.18, 2.0)) * 0.52;
        float orbitalDust = starField(
            rotatingDust + vec2(4.3, 7.8),
            25.0 * uStarScale,
            0.952
        ) * dustMask;
        float distantStars = starField(
            point + vec2(8.2, 3.6),
            19.0 * uStarScale,
            0.967
        ) * 0.42;
        float stars = orbitalDust * 0.9 + distantStars;

        float hueShift = smoothstep(
            0.18,
            0.86,
            0.5 + 0.5 * sin(orbitalAngle * 1.45 + cloudDetail * 4.0)
        );
        vec3 gasColor = mix(uColorCool, uColorWarm, hueShift);
        gasColor = mix(gasColor, uColorDust, smoothstep(0.54, 0.88, cloudDetail) * 0.3);
        vec3 orbitColor = mix(uColorDust, uColorCore, 0.34 + cloudDetail * 0.26);

        vec3 color = gasColor * gas * 1.7;
        color += mix(uColorCool, uColorCore, 0.62) * coreGlow * 0.68;
        color += uColorCore * coreLight * 1.34;
        color += orbitColor * orbitEnergy * 0.92;
        color += mix(uColorDust, vec3(1.0), 0.56) * stars;
        color *= uIntensity;

        float horizontalVignette = 1.0 - smoothstep(
            0.82,
            1.52,
            abs(point.x) / max(uAspect, 1.0)
        );
        float verticalVignette = 1.0 - smoothstep(0.78, 1.14, abs(point.y));
        float alpha = gas * 1.14
            + coreGlow * 0.34
            + coreLight * 0.62
            + orbitEnergy * 0.68
            + stars * 0.84;
        alpha *= uIntensity * mix(1.0, 0.7, uLightMode);
        alpha *= horizontalVignette * verticalVignette;
        alpha = clamp(alpha, 0.0, mix(0.84, 0.5, uLightMode));

        float dither = (rewardHash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
        gl_FragColor = vec4(max(color + dither, 0.0), alpha);
    }
`
