import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const cosmicRibbonsFragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform float uAspect;
    uniform vec3 uColorCool;
    uniform vec3 uColorWarm;
    uniform vec3 uColorHighlight;
    uniform float uIntensity;
    uniform float uStarScale;
    varying vec2 vUv;

    ${glslNoise2D}

    mat2 rotate2d(float angle) {
        float sine = sin(angle);
        float cosine = cos(angle);
        return mat2(cosine, -sine, sine, cosine);
    }

    vec3 ribbonLayer(
        vec2 point,
        float verticalOffset,
        float phase,
        float width,
        float amplitude,
        vec3 tint
    ) {
        float slowWarp = rewardFbm(vec2(point.x * 0.52 + phase, uTime * 0.026 + phase)) - 0.5;
        float fineWarp = rewardNoise(vec2(point.x * 1.85 - uTime * 0.035, phase * 4.7)) - 0.5;
        float center = verticalOffset
            + sin(point.x * 1.08 + phase + uTime * 0.19) * amplitude
            + sin(point.x * 2.36 - phase * 0.72 - uTime * 0.11) * amplitude * 0.28
            + slowWarp * amplitude * 0.9
            + fineWarp * amplitude * 0.16;

        float distanceToCenter = abs(point.y - center);
        float haze = exp(-distanceToCenter / (width * 4.8));
        float fabric = 1.0 - smoothstep(width * 0.42, width * 2.2, distanceToCenter);
        float luminousCore = exp(-distanceToCenter / (width * 0.36));
        float edge = exp(-abs(distanceToCenter - width * 0.86) / (width * 0.22));
        float texture = 0.7 + rewardNoise(vec2(point.x * 6.2 - uTime * 0.08, point.y * 13.0 + phase)) * 0.3;

        return tint * (
            haze * 0.18
            + fabric * texture * 0.5
            + luminousCore * 0.42
            + edge * texture * 0.12
        );
    }

    float roundStar(vec2 point, float scale, float threshold) {
        vec2 gridPoint = point * scale;
        vec2 cell = floor(gridPoint);
        vec2 localPoint = fract(gridPoint) - 0.5;
        float seed = rewardHash(cell);
        vec2 offset = vec2(
            rewardHash(cell + vec2(3.1, 7.7)),
            rewardHash(cell + vec2(8.3, 2.9))
        ) - 0.5;
        float radius = mix(0.025, 0.07, rewardHash(cell + 4.2));
        float star = 1.0 - smoothstep(radius * 0.25, radius, length(localPoint - offset * 0.72));
        float twinkle = 0.72 + 0.28 * sin(uTime * 0.7 + seed * 20.0);
        return star * step(threshold, seed) * twinkle;
    }

    void main() {
        vec2 point = vUv * 2.0 - 1.0;
        point.x *= uAspect;
        vec2 backPoint = rotate2d(-0.1) * point;
        vec2 middlePoint = rotate2d(0.055) * point;
        vec2 frontPoint = rotate2d(-0.035) * point;

        vec3 backRibbon = ribbonLayer(
            backPoint,
            -0.44,
            0.8,
            0.115,
            0.23,
            mix(uColorCool, uColorHighlight, 0.24)
        ) * 0.46;
        vec3 middleRibbon = ribbonLayer(
            middlePoint,
            0.03,
            3.6,
            0.095,
            0.27,
            uColorWarm
        ) * 0.72;
        vec3 frontRibbon = ribbonLayer(
            frontPoint,
            0.34,
            5.4,
            0.078,
            0.21,
            uColorHighlight
        );

        float cloudNoise = rewardFbm(point * 0.68 + vec2(uTime * 0.012, -uTime * 0.009));
        float cloudMask = smoothstep(0.58, 0.88, cloudNoise) * 0.11;
        vec3 cloudColor = mix(uColorCool, uColorWarm, smoothstep(-0.7, 0.8, point.x));

        float farStars = roundStar(point + vec2(7.3, 2.6), 19.0 * uStarScale, 0.935) * 0.34;
        float nearStars = roundStar(point + vec2(-3.7, 8.1), 31.0 * uStarScale, 0.974) * 0.72;
        float stars = farStars + nearStars;

        vec3 color = (backRibbon + middleRibbon + frontRibbon) * uIntensity;
        color += cloudColor * cloudMask * uIntensity;
        color += mix(uColorHighlight, vec3(1.0), 0.72) * stars;

        float ribbonEnergy = max(
            max(max(backRibbon.r, backRibbon.g), max(middleRibbon.r, middleRibbon.g)),
            max(frontRibbon.r, frontRibbon.g)
        );
        float horizontalVignette = 1.0 - smoothstep(0.72, 1.52, abs(point.x) / max(uAspect, 1.0));
        float verticalVignette = 1.0 - smoothstep(0.72, 1.22, abs(point.y));
        float alpha = clamp(ribbonEnergy * 0.72 + cloudMask * 0.45 + stars * 0.72, 0.0, 0.78);
        alpha *= horizontalVignette * verticalVignette;

        gl_FragColor = vec4(color, alpha);
    }
`
