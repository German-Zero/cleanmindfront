import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const meteorShowerFragmentShader = `
    precision highp float;

    ${glslNoise2D}

    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;
    uniform float uLightMode;
    uniform float uStarScale;
    uniform float uMeteorCount;
    uniform float uMeteorSeed;
    uniform vec3 uColorHead;
    uniform vec3 uColorCool;
    uniform vec3 uColorWarm;
    uniform vec3 uColorStar;
    varying vec2 vUv;

    float starField(vec2 point, float scale, float threshold, float layerSeed) {
        vec2 gridPoint = point * scale;
        vec2 cell = floor(gridPoint);
        vec2 localPoint = fract(gridPoint) - 0.5;
        float seed = rewardHash(cell + layerSeed);
        vec2 offset = vec2(
            rewardHash(cell + vec2(3.7, 8.1) + layerSeed),
            rewardHash(cell + vec2(9.2, 2.4) + layerSeed)
        ) - 0.5;
        float radius = mix(0.022, 0.06, rewardHash(cell + 4.6 + layerSeed));
        float star = 1.0 - smoothstep(
            radius * 0.2,
            radius,
            length(localPoint - offset * 0.76)
        );
        float twinkle = 0.8 + 0.2 * sin(uTime * 0.42 + seed * 17.0);
        return star * step(threshold, seed) * twinkle;
    }

    vec3 meteorLight(
        vec2 point,
        vec2 origin,
        float phase,
        float speed,
        float tailLength,
        float width,
        float slope
    ) {
        float cycle = fract(uTime * speed + phase);
        float activity = smoothstep(0.0, 0.012, cycle)
            * (1.0 - smoothstep(0.97, 1.0, cycle));
        float progress = cycle;
        vec2 direction = normalize(vec2(-1.0, -slope));
        float horizontalTravel = (origin.x + uAspect * 0.92) / abs(direction.x);
        float verticalTravel = (origin.y + 0.92) / abs(direction.y);
        float travelDistance = min(horizontalTravel, verticalTravel);
        vec2 headPosition = origin
            + direction * progress * travelDistance;
        vec2 relative = point - headPosition;
        vec2 tailDirection = -direction;
        vec2 normal = vec2(-tailDirection.y, tailDirection.x);
        float along = dot(relative, tailDirection);
        float across = abs(dot(relative, normal));
        float tailProgress = clamp(along / tailLength, 0.0, 1.0);
        float taper = mix(1.0, 0.2, tailProgress);
        float filament = exp(-pow(across / max(width * taper, 0.0008), 2.0));
        float tail = filament
            * step(0.0, along)
            * (1.0 - smoothstep(0.76, 1.0, tailProgress))
            * exp(-tailProgress * 2.5);

        float headDistance = length(relative);
        float head = exp(-pow(headDistance / (width * 1.25), 2.0));
        float halo = exp(-headDistance / (width * 3.8)) * 0.28;

        float horizontalEdge = 1.0 - smoothstep(
            uAspect * 0.9,
            uAspect * 1.08,
            abs(headPosition.x)
        );
        float verticalEdge = 1.0 - smoothstep(0.9, 1.08, abs(headPosition.y));
        float edgeFade = horizontalEdge * verticalEdge;

        return vec3(head, tail, halo) * activity * edgeFade;
    }

    void main() {
        vec2 point = vUv * 2.0 - 1.0;
        point.x *= uAspect;

        vec2 starPoint = point + vec2(uTime * 0.0025, -uTime * 0.0015);
        float smallStars = starField(
            starPoint + vec2(2.4, 7.1),
            20.0 * uStarScale,
            0.952,
            2.1
        );
        float brightStars = starField(
            starPoint * 0.92 + vec2(8.7, 3.5),
            14.0 * uStarScale,
            0.977,
            7.4
        );
        float stars = smallStars * 0.46 + brightStars * 0.82;

        vec3 meteors = vec3(0.0);

        for (int meteorIndex = 0; meteorIndex < 12; meteorIndex++) {
            float index = float(meteorIndex);

            if (index >= uMeteorCount) {
                continue;
            }

            float identity = index + uMeteorSeed * 23.71;
            float positionSeed = rewardHash(vec2(identity, 2.7));
            float heightSeed = rewardHash(vec2(identity, 8.4));
            float phaseSeed = rewardHash(vec2(identity, 14.2));
            float speedSeed = rewardHash(vec2(identity, 21.8));
            float lengthSeed = rewardHash(vec2(identity, 31.6));
            float widthSeed = rewardHash(vec2(identity, 43.3));
            float slopeSeed = rewardHash(vec2(identity, 57.9));
            float strengthSeed = rewardHash(vec2(identity, 72.4));
            float phase = fract(
                (index + phaseSeed * 0.72) / uMeteorCount
                + uMeteorSeed
            );

            meteors += meteorLight(
                point,
                vec2(
                    uAspect * mix(0.06, 0.9, positionSeed),
                    mix(0.58, 0.92, heightSeed)
                ),
                phase,
                mix(0.038, 0.068, speedSeed),
                mix(0.24, 0.52, lengthSeed),
                mix(0.0072, 0.0118, widthSeed),
                mix(0.43, 0.67, slopeSeed)
            ) * mix(0.54, 0.88, strengthSeed);
        }

        float hazeNoise = rewardFbm(point * 0.82 + vec2(uTime * 0.006, -uTime * 0.004));
        float atmosphere = smoothstep(0.52, 0.84, hazeNoise)
            * (1.0 - smoothstep(0.2, 1.08, length(point * vec2(0.56, 0.9))))
            * 0.09;

        vec3 color = uColorStar * stars;
        color += uColorCool * meteors.y * 1.52;
        color += mix(uColorCool, uColorWarm, 0.58) * meteors.z;
        color += uColorHead * meteors.x * 1.66;
        color += mix(uColorCool, uColorWarm, 0.34) * atmosphere;
        color *= uIntensity;

        float meteorAlpha = meteors.x * 1.04 + meteors.y * 1.12 + meteors.z * 0.4;
        float alpha = stars * 0.66 + meteorAlpha + atmosphere;
        alpha *= uIntensity * mix(1.0, 0.68, uLightMode);
        alpha = clamp(alpha, 0.0, mix(0.92, 0.58, uLightMode));

        float dither = (rewardHash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
        gl_FragColor = vec4(max(color + dither, 0.0), alpha);
    }
`
