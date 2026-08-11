import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const tidalWaveFragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;

    ${glslNoise2D}

    float foamLace(vec2 point) {
        vec2 baseCell = floor(point);
        vec2 local = fract(point);
        float closest = 8.0;
        float secondClosest = 8.0;

        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 neighbor = vec2(float(x), float(y));
                vec2 cell = baseCell + neighbor;
                vec2 jitter = vec2(
                    rewardHash(cell + vec2(7.3, 2.1)),
                    rewardHash(cell + vec2(19.7, 11.4))
                );
                float distanceToPoint = length(neighbor + jitter - local);

                if (distanceToPoint < closest) {
                    secondClosest = closest;
                    closest = distanceToPoint;
                } else if (distanceToPoint < secondClosest) {
                    secondClosest = distanceToPoint;
                }
            }
        }

        float edgeDistance = secondClosest - closest;
        return 1.0 - smoothstep(0.025, 0.12, edgeDistance);
    }

    float foamTexture(vec2 uv, float height, float width, float phase) {
        float distanceToCrest = abs(uv.y - height);
        float crest = 1.0 - smoothstep(width * 0.16, width, distanceToCrest);
        vec2 foamUv = vec2(
            uv.x * uAspect * 13.0 + phase + uTime * 0.016,
            uv.y * 34.0 - uTime * 0.03
        );
        float broadPockets = rewardFbm(foamUv);
        float finePockets = rewardNoise(foamUv * 3.4 + vec2(4.7, 9.1));
        float pocketMask = smoothstep(
            0.36,
            0.66,
            broadPockets * 0.68 + finePockets * 0.32
        );
        float cellularLace = foamLace(vec2(
            uv.x * uAspect * 28.0 + phase + uTime * 0.024,
            (uv.y - height) * 118.0 - uTime * 0.032
        ));
        float clusteredFoam = smoothstep(0.67, 0.82, finePockets)
            * (1.0 - smoothstep(width * 0.56, width * 1.38, distanceToCrest));
        float thinCore = 1.0 - smoothstep(width * 0.08, width * 0.3, distanceToCrest);

        return crest * (cellularLace * (0.24 + pocketMask * 0.76) + clusteredFoam * 0.38)
            + thinCore * pocketMask * 0.18;
    }

    float foamFlecks(vec2 uv, float height, float phase) {
        float depthFromCrest = height - uv.y;
        float shallowBand = smoothstep(-0.018, 0.014, depthFromCrest)
            * (1.0 - smoothstep(0.014, 0.12, depthFromCrest));
        vec2 fleckUv = vec2(
            uv.x * uAspect * 88.0 + phase + uTime * 0.026,
            uv.y * 76.0 - uTime * 0.045
        );
        float clusters = rewardFbm(fleckUv * 0.15 + vec2(8.2, phase));
        float grains = rewardNoise(fleckUv);
        float fragments = smoothstep(0.68, 0.86, grains)
            * smoothstep(0.4, 0.65, clusters);

        return shallowBand * fragments;
    }

    float bubbleRing(vec2 uv, vec2 position, float radius) {
        vec2 delta = uv - position;
        delta.x *= uAspect;
        float distanceToCenter = length(delta);
        float outer = 1.0 - smoothstep(radius, radius + 0.0025, distanceToCenter);
        float inner = 1.0 - smoothstep(radius * 0.58, radius * 0.76, distanceToCenter);
        return max(outer - inner, 0.0);
    }

    float bubbleField(vec2 uv, float time, float waterHeight) {
        float field = 0.0;

        for (int index = 0; index < 6; index++) {
            float item = float(index);
            float seed = rewardHash(vec2(item + 3.7, item * 1.91 + 9.2));
            float horizontal = fract(0.1 + item * 0.19 + sin(time * 0.1 + item * 2.4) * 0.012);
            float vertical = 0.07 + fract(seed + time * (0.004 + seed * 0.003))
                * max(waterHeight - 0.1, 0.12);
            float radius = mix(0.0038, 0.007, rewardHash(vec2(item + 15.0, seed)));
            field += bubbleRing(uv, vec2(horizontal, vertical), radius)
                * mix(0.24, 0.56, seed);
        }

        return min(field, 1.0);
    }

    void main() {
        vec2 uv = vUv;
        vec2 centered = uv - 0.5;
        centered.x *= uAspect;

        float tide = 0.5 + 0.5 * sin(uTime * 0.18);
        float undertow = sin(uTime * 0.12 + 1.8);
        vec2 flow = vec2(
            centered.x * 1.64 + undertow * 0.16,
            uv.y * 2.4 + uTime * 0.02
        );
        float watercolor = rewardFbm(flow * 1.16);
        float detail = rewardFbm(flow * 3.0 + vec2(tide * 0.28, 5.1));

        float shoreHeight = 0.255
            + tide * 0.12
            + sin(centered.x * 3.8 + undertow * 0.9) * 0.034
            + sin(centered.x * 8.6 - uTime * 0.075) * 0.015
            + (watercolor - 0.5) * 0.025;
        float water = 1.0 - smoothstep(shoreHeight - 0.035, shoreHeight + 0.055, uv.y);
        float mainFoam = foamTexture(uv, shoreHeight, 0.052, 4.8);
        float recedingFoam = foamTexture(
            uv,
            shoreHeight - 0.075 - detail * 0.014,
            0.022,
            13.4
        ) * 0.2;
        float foamSpray = foamFlecks(uv, shoreHeight, 7.2);
        float depthFromCrest = shoreHeight - uv.y;
        float washNoise = rewardFbm(vec2(
            uv.x * uAspect * 16.0 - uTime * 0.018,
            uv.y * 42.0 + detail * 2.2
        ));
        float shoreWash = smoothstep(-0.018, 0.008, depthFromCrest)
            * (1.0 - smoothstep(0.022, 0.105, depthFromCrest))
            * smoothstep(0.31, 0.66, washNoise);

        vec2 causticUv = vec2(centered.x * 22.0, uv.y * 20.0);
        float causticWeb = abs(
            sin(causticUv.x + detail * 4.1 + uTime * 0.09)
            + sin(causticUv.y - watercolor * 4.6 - uTime * 0.065)
        );
        float depthFade = 1.0 - smoothstep(0.02, shoreHeight - 0.02, uv.y);
        float caustics = (1.0 - smoothstep(0.035, 0.21, causticWeb))
            * water
            * depthFade;
        float surfaceGrain = rewardNoise(
            vec2(uv.x * uAspect * 72.0, uv.y * 64.0) + uTime * 0.026
        );
        float glitter = smoothstep(0.77, 0.92, surfaceGrain)
            * water
            * (0.25 + detail * 0.75);
        float bubbles = bubbleField(uv, uTime, shoreHeight) * water;

        vec3 deepColor = mix(uColorA * 0.58, uColorA, watercolor);
        vec3 shallowColor = mix(uColorA, uColorB, 0.42 + detail * 0.2);
        vec3 color = mix(deepColor, shallowColor, clamp(uv.y / max(shoreHeight, 0.1), 0.0, 1.0));
        color = mix(
            color,
            uColorC * 1.06,
            clamp(mainFoam * 1.04 + recedingFoam + shoreWash * 0.34, 0.0, 0.96)
        );
        color += uColorC * caustics * 0.24;
        color += uColorC * glitter * 0.12;
        color += uColorC * bubbles * 0.25;

        float edgeFade = smoothstep(0.0, 0.025, uv.x)
            * (1.0 - smoothstep(0.975, 1.0, uv.x));
        float alpha = (
            water * (0.1 + watercolor * 0.04)
            + mainFoam * 0.64
            + recedingFoam * 0.16
            + shoreWash * 0.11
            + foamSpray * 0.3
            + caustics * 0.075
            + glitter * 0.045
            + bubbles * 0.1
        ) * edgeFade * uIntensity;

        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.72));
    }
`
