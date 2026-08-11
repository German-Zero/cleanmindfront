import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const rainyWindowFragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying vec2 vUv;

    ${glslNoise2D}

    float softCircle(vec2 uv, vec2 position, float radius) {
        vec2 delta = uv - position;
        delta.x *= uAspect;
        return 1.0 - smoothstep(radius * 0.42, radius, length(delta));
    }

    vec3 fixedDropLayer(vec2 uv, float columns, float rows, float offset) {
        vec2 grid = vec2(uv.x * uAspect, uv.y) * vec2(columns, rows);
        vec2 cell = floor(grid);
        vec2 local = fract(grid) - 0.5;
        float seed = rewardHash(cell + vec2(offset, offset * 1.73));
        float presence = step(0.46, seed);
        vec2 center = vec2(
            mix(-0.31, 0.31, rewardHash(cell + offset + 8.7)),
            mix(-0.32, 0.32, rewardHash(cell + offset + 17.4))
        );
        float size = mix(0.052, 0.112, rewardHash(cell + offset + 31.8));
        vec2 point = local - center;
        point.x += point.y * mix(-0.035, 0.035, seed);
        float distanceToDrop = length(point / vec2(size, size * 1.22));
        float body = (1.0 - smoothstep(0.78, 1.05, distanceToDrop)) * presence;
        float inner = (1.0 - smoothstep(0.48, 0.76, distanceToDrop)) * presence;
        float rim = max(body - inner * 0.72, 0.0);
        float highlight = (1.0 - smoothstep(
            size * 0.22,
            size * 0.62,
            length(point - vec2(-size * 0.24, size * 0.28))
        )) * body;
        float shadow = (1.0 - smoothstep(
            size * 0.56,
            size * 1.08,
            length(point - vec2(size * 0.12, -size * 0.08))
        )) * body;

        return vec3(body, rim + highlight * 0.78, shadow);
    }

    vec3 slidingDropLayer(
        vec2 uv,
        float columns,
        float rows,
        float speed,
        float offset
    ) {
        vec2 grid = vec2(uv.x * uAspect, uv.y) * vec2(columns, rows);
        vec2 cell = floor(grid);
        vec2 local = fract(grid) - 0.5;
        float seed = rewardHash(cell + vec2(offset, offset * 2.13));
        float enabledDrop = step(0.48, seed);
        float cycle = fract(uTime * speed + seed * 1.91);
        float headY = mix(0.72, -0.76, cycle);
        float anchorX = mix(-0.32, 0.32, rewardHash(cell + offset + 12.6));
        float verticalDistance = local.y - headY;
        float bend = sin(
            verticalDistance * mix(7.0, 12.0, seed)
            + seed * 8.0
            + uTime * 0.12
        ) * 0.018;
        float horizontalDistance = local.x - anchorX - bend;
        float headSize = mix(0.068, 0.112, rewardHash(cell + offset + 21.7));
        float headDistance = length(vec2(
            horizontalDistance / headSize,
            (local.y - headY) / (headSize * 1.34)
        ));
        float head = (1.0 - smoothstep(0.72, 1.08, headDistance)) * enabledDrop;
        float tailBand = smoothstep(-0.015, 0.035, verticalDistance)
            * (1.0 - smoothstep(0.12, 0.7, verticalDistance));
        float tailWidth = mix(
            headSize * 0.34,
            headSize * 0.11,
            clamp(verticalDistance / 0.7, 0.0, 1.0)
        );
        float trail = (1.0 - smoothstep(tailWidth, tailWidth + 0.018, abs(horizontalDistance)))
            * tailBand
            * enabledDrop;
        float sideLight = (1.0 - smoothstep(
            headSize * 0.24,
            headSize * 0.72,
            length(vec2(
                horizontalDistance + headSize * 0.28,
                local.y - headY - headSize * 0.22
            ))
        )) * head;

        return vec3(head, trail, sideLight);
    }

    void main() {
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * uAspect, uv.y);

        float slowFog = rewardFbm(vec2(
            aspectUv.x * 0.72 + uTime * 0.006,
            uv.y * 1.35 - uTime * 0.004
        ));
        float fineFog = rewardFbm(vec2(
            aspectUv.x * 2.2 - uTime * 0.008,
            uv.y * 3.1 + 7.4
        ));

        vec3 fixedLarge = fixedDropLayer(uv, 17.0, 8.0, 4.7);
        vec3 fixedSmall = fixedDropLayer(uv + vec2(0.017, 0.009), 31.0, 15.0, 19.3);
        vec3 slideNear = slidingDropLayer(uv, 12.0, 2.8, 0.055, 8.6);
        vec3 slideFar = slidingDropLayer(uv + vec2(0.021, 0.0), 21.0, 4.4, 0.082, 27.2);

        float fixedBody = fixedLarge.x * 0.62 + fixedSmall.x * 0.34;
        float fixedLight = fixedLarge.y * 0.68 + fixedSmall.y * 0.38;
        float fixedShadow = fixedLarge.z * 0.44 + fixedSmall.z * 0.22;
        float movingHeads = slideNear.x * 0.92 + slideFar.x * 0.54;
        float movingTrails = slideNear.y * 0.64 + slideFar.y * 0.38;
        float movingLight = slideNear.z * 0.95 + slideFar.z * 0.5;

        float microPattern = rewardNoise(aspectUv * vec2(92.0, 76.0) + vec2(11.0, 3.0));
        float microDrops = smoothstep(0.91, 0.985, microPattern)
            * (0.46 + fineFog * 0.54);

        float distantLights = 0.0;
        distantLights += softCircle(uv, vec2(0.12, 0.13), 0.095) * 0.32;
        distantLights += softCircle(uv, vec2(0.31, 0.2), 0.052) * 0.24;
        distantLights += softCircle(uv, vec2(0.58, 0.11), 0.12) * 0.25;
        distantLights += softCircle(uv, vec2(0.78, 0.25), 0.064) * 0.22;
        distantLights += softCircle(uv, vec2(0.91, 0.15), 0.082) * 0.2;
        distantLights *= 0.42 + slowFog * 0.58;

        float verticalTint = smoothstep(0.0, 1.0, uv.y);
        vec3 deepGlass = mix(uColorA * 0.48, uColorA * 0.82, slowFog);
        vec3 rainyBlue = mix(uColorA, uColorB, 0.16 + verticalTint * 0.16 + fineFog * 0.08);
        vec3 color = mix(deepGlass, rainyBlue, 0.62);
        color += uColorB * distantLights * 0.3;
        color -= uColorA * fixedShadow * 0.18;
        color = mix(color, uColorB, clamp(fixedBody * 0.22 + movingTrails * 0.1, 0.0, 0.3));
        color += uColorC * (
            fixedLight * 0.46
            + movingHeads * 0.42
            + movingLight * 0.7
            + microDrops * 0.34
        );

        float vignette = smoothstep(0.0, 0.12, uv.x)
            * (1.0 - smoothstep(0.88, 1.0, uv.x))
            * smoothstep(0.0, 0.09, uv.y)
            * (1.0 - smoothstep(0.94, 1.0, uv.y));
        float alpha = (
            0.055
            + slowFog * 0.055
            + distantLights * 0.07
            + fixedBody * 0.2
            + fixedLight * 0.24
            + movingHeads * 0.42
            + movingTrails * 0.26
            + movingLight * 0.28
            + microDrops * 0.24
        ) * mix(0.76, 1.0, vignette) * uIntensity;

        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.72));
    }
`
