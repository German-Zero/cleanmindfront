import { glslNoise2D } from "../../renderers/webgl/shaders/noise"

export const prismaticAuroraFragmentShader = `
    ${glslNoise2D}

    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;
    uniform float uLightMode;
    uniform vec3 uColorBoreal;
    uniform vec3 uColorPrimary;
    uniform vec3 uColorSecondary;
    uniform vec3 uColorAccent;
    varying vec2 vUv;

    vec4 auroraSheet(
        vec2 uv,
        float baseHeight,
        float length,
        float phase,
        float frequency
    ) {
        float time = uTime * 0.072;
        float horizontalDrift = time * 0.19 + phase;
        float broadNoise = rewardFbm(vec2(uv.x * 1.65 + horizontalDrift, phase + time * 0.13));
        float detailNoise = rewardFbm(vec2(uv.x * 5.4 - horizontalDrift, phase * 2.2 + time * 0.18));
        float flowNoise = rewardFbm(vec2(
            uv.x * 6.2 + phase + time * 0.1,
            uv.y * 2.7 - time * 0.16 + phase * 0.7
        ));
        float top = baseHeight
            + sin(uv.x * frequency + time + phase) * 0.045
            + sin(uv.x * frequency * 2.1 - time * 0.63 + phase * 2.4) * 0.016
            + (broadNoise - 0.5) * 0.085;

        float belowTop = top - uv.y;
        float variableLength = length * (0.86 + broadNoise * 0.24);
        float bounds = smoothstep(-0.014, 0.009, belowTop)
            * (1.0 - smoothstep(variableLength * 0.74, variableLength, belowTop));
        float normalizedDepth = clamp(belowTop / max(variableLength, 0.001), 0.0, 1.0);

        float warpedX = uv.x
            + sin(uv.y * 10.0 + phase + time * 0.52) * 0.021
            + (detailNoise - 0.5) * 0.018
            + (flowNoise - 0.5) * 0.04;
        float wideFold = 0.5 + 0.5 * sin(
            warpedX * 32.0 + phase * 5.0 - time * 0.78 + flowNoise * 2.7
        );
        float fineFold = 0.5 + 0.5 * sin(
            warpedX * 88.0 - phase * 3.0 + time * 0.49 - flowNoise * 3.4
        );
        float striations = pow(clamp(wideFold * 0.46 + fineFold * 0.54, 0.0, 1.0), 2.55);
        float veilNoise = rewardFbm(vec2(
            uv.x * 3.1 + uv.y * 0.9 + phase,
            uv.y * 3.8 - time * 0.13
        ));
        float softVeil = 0.16 + veilNoise * 0.28;
        float billow = 0.75 + 0.25 * sin(normalizedDepth * 8.0 + flowNoise * 4.4 + phase);
        float verticalFade = exp(-normalizedDepth * 1.12);
        float curtain = bounds * verticalFade * (softVeil + striations * billow);

        float upperEdge = exp(-pow(abs(uv.y - top) / 0.017, 2.0));
        upperEdge *= 0.22 + striations * 0.38;

        return vec4(upperEdge, curtain, normalizedDepth, striations);
    }

    void main() {
        vec2 uv = vUv;
        vec2 aspectUv = uv - 0.5;
        aspectUv.x *= uAspect;

        vec4 rearSheet = auroraSheet(uv, 0.75, 0.32, 3.4, 5.4);
        vec4 mainSheet = auroraSheet(uv, 0.87, 0.46, 0.3, 4.6);
        vec4 highFringe = auroraSheet(uv, 0.94, 0.21, 6.1, 6.2);

        float mainLight = mainSheet.y * 1.08 + mainSheet.x * 0.12;
        float rearLight = rearSheet.y * 0.52 + rearSheet.x * 0.08;
        float fringeLight = highFringe.y * 0.36 + highFringe.x * 0.07;
        float shimmer = 0.92 + 0.08 * sin(uTime * 0.24 + uv.x * 6.0 + mainSheet.w * 2.0);
        float totalLight = (mainLight + rearLight + fringeLight) * shimmer;

        vec3 mainColor = mix(uColorBoreal, uColorSecondary, smoothstep(0.12, 0.9, mainSheet.z));
        mainColor = mix(mainColor, uColorBoreal, mainSheet.w * 0.34);
        vec3 rearColor = mix(uColorPrimary, uColorSecondary, rearSheet.z * 0.72);
        vec3 fringeColor = mix(uColorAccent, uColorBoreal, 0.14 + highFringe.z * 0.26);
        vec3 color = (
            mainColor * mainLight
            + rearColor * rearLight
            + fringeColor * fringeLight
        ) / max(mainLight + rearLight + fringeLight, 0.001);

        float skyGlow = exp(-length(aspectUv - vec2(0.08, 0.32)) * 3.0) * 0.02;
        color += mix(uColorBoreal, uColorSecondary, uv.x) * skyGlow;
        color *= mix(1.12, 0.98, uLightMode);

        float alpha = (totalLight * 0.92 + skyGlow) * uIntensity;
        alpha *= mix(1.0, 0.72, uLightMode);
        alpha *= smoothstep(0.27, 0.46, uv.y);
        alpha = clamp(alpha, 0.0, mix(0.78, 0.45, uLightMode));

        float dither = (rewardHash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
        gl_FragColor = vec4(max(color + dither, 0.0), alpha);
    }
`
