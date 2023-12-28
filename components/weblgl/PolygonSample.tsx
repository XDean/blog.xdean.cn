import {Coordinates, Line, Mafs, Polygon, Text, useMovablePoint} from 'mafs';

export const PolygonSample = () => {
  const p = useMovablePoint([0.5, 0.5 / Math.sqrt(3)], {
    constrain: ([x]) => {
      x = Math.max(-0.5, Math.min(1, x));
      return [x, (1 - x) / Math.sqrt(3)];
    },
  });
  return (
    <Mafs
      viewBox={{y: [0, 0.5]}}
      width={500}
      height={300}
      pan={false}
    >
      <Coordinates.Cartesian
        xAxis={{labels: false}}
        yAxis={{labels: false}}
      />
      <Polygon
        points={[[0, 0], [1, 0], [-0.5, Math.sqrt(3) / 2]]}
      />
      <Line.Segment
        point1={[0, 0]}
        point2={[p.x, p.y]}
      />
      <Line.Segment
        point1={[p.x, 0]}
        point2={[p.x, p.y]}
      />
      <Text
        x={p.x}
        y={p.y}
        attach={'s'}
        attachDistance={40}
      >
        P
      </Text>
      <Text
        x={p.x}
        y={0}
        attach={'n'}
        attachDistance={40}
      >
        S
      </Text>
      <Text
        x={-0.1}
        y={-0.1}
      >
        O
      </Text>
      <Text
        x={1.1}
        y={-0.1}
      >
        R
      </Text>
      {p.element}
    </Mafs>
  );
};