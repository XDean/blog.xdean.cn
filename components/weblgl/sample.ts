export const Sample = {
  circle: `float dist(vec2 p) {return length(p);}`,
  triangleNaive: `\
float dist(vec2 p) {
  float r3 = 1.732051;
  float offset = 2.0 / r3 - 1.0;
  vec2 p0 = vec2(-r3 / 2.0, -0.5);
  vec2 p1 = vec2(r3 / 2.0, -0.5);
  vec2 p2 = vec2(0, 1.0);
  float area = 0.5 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
  float s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) / 2.0 / area;
  float t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) / 2.0 / area;
  return max(max(1.0 - s, 1.0 - t), s + t);
}
`,
  triangle: `\
float dist(vec2 p) {
  float n = 3.0; // change it!
  float outCorner = PI * 2.0 / n;
  float innerCorner = PI - outCorner;
  float angle = atan(p.y, p.x);
  float theta = mod(angle, outCorner);
  float len = length(p);
  float vLine = len * sin(theta);
  float radius = (len * cos(theta)) + (vLine / tan(innerCorner / 2.0));
  return radius;
}
`,
  rotate: `\
vec2 rotate(vec2 p, float rad) {
  float r = length(p);
  float angle = atan(p.y, p.x) + rad;
  return vec2(r * cos(angle), r * sin(angle));
}

float dist(vec2 p) {
  float n = 3.0;
  float rad = PI / 2.0; // change it!
  p = rotate(p, rad);
  float outCorner = PI * 2.0 / n;
  float innerCorner = PI - outCorner;
  float angle = atan(p.y, p.x);
  float theta = mod(angle, outCorner);
  float len = length(p);
  float vLine = len * sin(theta);
  float radius = (len * cos(theta)) + (vLine / tan(innerCorner / 2.0));
  return radius;
}
`,
  star:`
vec2 rotate(vec2 p, float rad) {
  float r = length(p);
  float angle = atan(p.y, p.x) + rad;
  return vec2(r * cos(angle), r * sin(angle));
}

float starCorner = PI / 2.5;
float dist(vec2 p) {
  p = rotate(p, 0.3 * PI);
  float len = length(p);
  float angle = atan(p.y, p.x) + 2.0 * PI;
  float theta = mod(angle, starCorner);
  if (theta > starCorner / 2.0) {
      theta = starCorner - theta;
  }
  float vLine = len * sin(theta);
  float radius = len * cos(theta) + vLine / tan(PI / 10.0);
  return radius;
}
`
};