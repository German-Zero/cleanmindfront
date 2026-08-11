export const fireflyVertexShader = `
    uniform float uTime;
    attribute float aSize;
    attribute float aPhase;
    varying float vPulse;

    void main() {
        vec3 animatedPosition = position;
        animatedPosition.x += sin(uTime * 0.34 + aPhase) * 0.025;
        animatedPosition.y += cos(uTime * 0.27 + aPhase * 1.7) * 0.045;

        vPulse = 0.48 + 0.52 * sin(uTime * 1.15 + aPhase * 2.4);
        gl_Position = vec4(animatedPosition, 1.0);
        gl_PointSize = aSize * (0.78 + vPulse * 0.38);
    }
`

export const fireflyFragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vPulse;

    void main() {
        vec2 point = gl_PointCoord - 0.5;
        float distanceFromCenter = length(point);
        float halo = 1.0 - smoothstep(0.08, 0.5, distanceFromCenter);
        float core = 1.0 - smoothstep(0.0, 0.13, distanceFromCenter);
        vec3 color = mix(uColorA, uColorB, vPulse);
        float alpha = halo * (0.18 + vPulse * 0.28) + core * 0.82;
        gl_FragColor = vec4(color, alpha);
    }
`
