export const bioluminescentFlowerVertexShader = `
    uniform float uTime;
    attribute float aSize;
    attribute float aPhase;
    attribute float aFallSpeed;
    attribute vec2 aDrift;
    attribute float aRotation;
    attribute float aSpinSpeed;
    attribute float aFlowerType;
    attribute float aDepth;
    attribute float aPulseRate;
    varying float vRotation;
    varying float vFlowerType;
    varying float vDepth;
    varying float vPulse;
    varying float vPhase;

    const float TAU = 6.28318530718;

    void main() {
        float fallCycle = fract(aPhase + uTime * aFallSpeed);
        float verticalPosition = 1.16 - fallCycle * 2.32;
        float breezeTime = uTime * (0.16 + aDepth * 0.045);
        float broadSway = sin(breezeTime + aPhase * TAU) * aDrift.x;
        float smallCurrent = sin(
            breezeTime * 0.54
            + verticalPosition * 2.1
            + aPhase * 11.0
        ) * aDrift.y;

        vec3 animatedPosition = position;
        animatedPosition.x += broadSway + smallCurrent;
        animatedPosition.y = verticalPosition;

        float pulse = sin(uTime * aPulseRate + aPhase * 17.0) * 0.5 + 0.5;

        vRotation = aRotation
            + uTime * aSpinSpeed
            + sin(breezeTime * 1.3 + aPhase * 8.0) * 0.12;
        vFlowerType = aFlowerType;
        vDepth = aDepth;
        vPulse = pulse;
        vPhase = aPhase;

        gl_Position = vec4(animatedPosition, 1.0);
        gl_PointSize = aSize
            * (0.82 + aDepth * 0.32)
            * (0.99 + pulse * 0.025);
    }
`

export const bioluminescentFlowerFragmentShader = `
    uniform vec3 uDaisy;
    uniform vec3 uDaisyCenter;
    uniform vec3 uSunflower;
    uniform vec3 uSunflowerCenter;
    uniform vec3 uRose;
    uniform vec3 uTulip;
    varying float vRotation;
    varying float vFlowerType;
    varying float vDepth;
    varying float vPulse;
    varying float vPhase;

    const float TAU = 6.28318530718;

    mat2 rotate2d(float angle) {
        float sine = sin(angle);
        float cosine = cos(angle);
        return mat2(cosine, -sine, sine, cosine);
    }

    float ellipseMask(vec2 point, vec2 radii, float softness) {
        float distanceToEdge = length(point / radii);
        return 1.0 - smoothstep(1.0 - softness, 1.0, distanceToEdge);
    }

    float flowerMask(vec2 point, float petalCount, vec2 petalSize, float offset) {
        float mask = 0.0;

        for (int index = 0; index < 12; index += 1) {
            float enabled = 1.0 - step(petalCount, float(index) + 0.5);
            float angle = float(index) * TAU / petalCount;
            vec2 localPoint = rotate2d(-angle) * point;
            float petal = ellipseMask(
                localPoint - vec2(0.0, offset),
                petalSize,
                0.16
            );
            mask = max(mask, petal * enabled);
        }

        return mask;
    }

    void main() {
        vec2 point = (gl_PointCoord - 0.5) * 2.0;
        point = rotate2d(-vRotation) * point;
        point.x += sin(point.y * 3.0 + vPhase * 19.0) * 0.018;

        float shape = 0.0;
        float detail = 0.0;
        float center = 0.0;
        vec3 color = uDaisy;

        if (vFlowerType < 0.5) {
            float petals = flowerMask(point, 10.0, vec2(0.105, 0.34), 0.47);
            float petalLight = flowerMask(point, 10.0, vec2(0.052, 0.27), 0.42);
            center = ellipseMask(point, vec2(0.21, 0.21), 0.16);
            shape = max(petals, center);
            color = mix(uDaisy * 0.76, uDaisy, petalLight * 0.82);
            color = mix(color, uDaisyCenter, center);
            detail = petalLight;
        } else if (vFlowerType < 1.5) {
            float petals = flowerMask(point, 12.0, vec2(0.09, 0.34), 0.47);
            center = ellipseMask(point, vec2(0.34, 0.34), 0.12);
            float seedPattern = center * (
                0.72
                + sin(length(point) * 52.0 + atan(point.y, point.x) * 9.0) * 0.14
            );
            shape = max(petals, center);
            color = mix(uSunflower * 0.72, uSunflower, petals);
            color = mix(color, uSunflowerCenter, seedPattern);
            detail = seedPattern;
        } else if (vFlowerType < 2.5) {
            float radius = length(point);
            float angle = atan(point.y, point.x);
            float outer = 1.0 - smoothstep(
                0.72,
                0.93,
                radius + sin(angle * 6.0 + radius * 8.0) * 0.065
            );
            float middle = 1.0 - smoothstep(
                0.43,
                0.68,
                radius + sin(angle * 5.0 - radius * 11.0) * 0.075
            );
            float inner = 1.0 - smoothstep(
                0.12,
                0.39,
                radius + sin(angle * 4.0 + radius * 14.0) * 0.06
            );
            shape = outer;
            detail = max(middle * 0.64, inner);
            color = uRose * (0.68 + middle * 0.2 + inner * 0.34);
        } else {
            float leftPetal = ellipseMask(
                point - vec2(-0.23, 0.04),
                vec2(0.36, 0.7),
                0.15
            );
            float centerPetal = ellipseMask(
                point - vec2(0.0, 0.13),
                vec2(0.33, 0.78),
                0.14
            );
            float rightPetal = ellipseMask(
                point - vec2(0.23, 0.04),
                vec2(0.36, 0.7),
                0.15
            );
            float baseCut = smoothstep(-0.92, -0.57, point.y);
            shape = max(leftPetal, max(centerPetal, rightPetal)) * baseCut;
            float crease = (
                1.0 - smoothstep(0.025, 0.17, abs(point.x))
            ) * shape;
            detail = max(centerPetal * 0.28, crease);
            color = mix(uTulip * 0.72, uTulip * 1.12, detail);
        }

        float radius = length(point);
        float halo = (1.0 - smoothstep(0.56, 1.06, radius)) * 0.035;
        float depthAlpha = 0.48 + vDepth * 0.38;
        float alpha = (
            shape * 0.86
            + halo
        ) * depthAlpha * (0.98 + vPulse * 0.02);

        if (alpha < 0.012) discard;

        float texture = 0.96 + sin(
            point.x * 25.0
            + point.y * 19.0
            + vPhase * 37.0
        ) * 0.04;
        vec3 finalColor = color * texture * (0.94 + detail * 0.13);

        gl_FragColor = vec4(finalColor, alpha);
    }
`
