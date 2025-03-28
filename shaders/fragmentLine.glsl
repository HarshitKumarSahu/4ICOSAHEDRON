uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;

float PI = 3.141592653589793238;

void main() {
    // vec2 newUV = (vUv - vec2(0.5)) * resolution.zw

    // vec3 X = dFdx(vPosition);
    // vec3 Y = dFdy(vPosition);
    // vec3 n = normalize(cross(X,Y)); 
    // gl_FragColor = vec4(vNormal, 1.0);
    // gl_FragColor = vec4(vPosition, 1.0);

    // float dist = length(gl_PointCoord - vec2(0.5));
    // float disc = smoothstep(0.5, 0.45, dist);
    // if (disc == 0.) discard;
    // gl_FragColor = vec4(gl_PointCoord, 1., disc);

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
