export const fireflyVertexShader = `
    uniform float uTime;
    attribute float aSize;
    attribute float aPhase;
    attribute vec2 aDrift;
    attribute float aDepth;
    attribute float aColorMix;
    attribute float aPulseRate;
    varying float vPulse;
    varying float vDepth;
    varying float vColorMix;

    void main() {
        vec3 animatedPosition = position;
        float slowTime = uTime * (0.18 + aDepth * 0.14);
        vec2 largeOrbit = vec2(
            sin(slowTime * 1.13 + aPhase),
            cos(slowTime * 0.83 + aPhase * 1.47)
        ) * aDrift;
        vec2 smallWander = vec2(
            sin(slowTime * 2.41 + aPhase * 2.7),
            cos(slowTime * 1.91 + aPhase * 0.64)
        ) * aDrift * 0.32;
        animatedPosition.xy += largeOrbit + smallWander;

        float mainPulse = sin(uTime * aPulseRate + aPhase * 4.7) * 0.5 + 0.5;
        float softPulse = sin(uTime * aPulseRate * 0.37 + aPhase * 1.9) * 0.5 + 0.5;
        vPulse = pow(clamp(mainPulse * 0.76 + softPulse * 0.24, 0.0, 1.0), 1.75);
        vDepth = aDepth;
        vColorMix = aColorMix;

        gl_Position = vec4(animatedPosition, 1.0);
        gl_PointSize = aSize * (0.58 + vPulse * 0.58) * (0.74 + aDepth * 0.34);
    }
`

export const fireflyFragmentShader = `
    uniform vec3 uColorCool;
    uniform vec3 uColorWarm;
    uniform vec3 uColorSoft;
    uniform float uIntensity;
    varying float vPulse;
    varying float vDepth;
    varying float vColorMix;

    void main() {
        vec2 point = gl_PointCoord - 0.5;
        float distanceFromCenter = length(point);
        if (distanceFromCenter > 0.5) discard;

        float halo = 1.0 - smoothstep(0.11, 0.5, distanceFromCenter);
        float innerGlow = 1.0 - smoothstep(0.04, 0.24, distanceFromCenter);
        vec2 bodyPoint = vec2(point.x * 1.18, point.y * 0.82);
        float core = 1.0 - smoothstep(0.02, 0.105, length(bodyPoint));
        vec3 fireflyColor = mix(uColorCool, uColorWarm, smoothstep(0.18, 0.86, vColorMix));
        fireflyColor = mix(fireflyColor, uColorSoft, core * 0.62);

        float pulseAlpha = 0.16 + vPulse * 0.84;
        float depthAlpha = 0.52 + vDepth * 0.48;
        float alpha = (halo * 0.16 + innerGlow * 0.38 + core * 0.92)
            * pulseAlpha
            * depthAlpha
            * uIntensity;

        gl_FragColor = vec4(fireflyColor * (0.58 + vPulse * 0.5), alpha);
    }
`
