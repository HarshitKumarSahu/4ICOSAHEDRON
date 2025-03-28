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
    vec3 X = dFdx(vPosition);
    vec3 Y = dFdy(vPosition);
    vec3 n = normalize(cross(X,Y)); 

    float diff = dot(n, normalize(vec3(1.)));
    diff *= diff * diff * diff * diff * diff * diff * diff * diff * diff * diff;

    // gl_FragColor = vec4(vNormal, 1.0);
    // gl_FragColor = vec4(vPosition, 1.0);
    // gl_FragColor = vec4(n, 1.0);
    gl_FragColor = vec4(n * diff, 1.0);
}
