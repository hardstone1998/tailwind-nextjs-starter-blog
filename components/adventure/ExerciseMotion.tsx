import type { CSSProperties } from 'react'

type Point = [number, number]
type Pose = {
  hip: Point
  shoulder: Point
  head: Point
  elbow: Point
  hand: Point
  knee: Point
  foot: Point
}
const poses: Record<string, [Pose, Pose]> = {
  'barbell-back-squat': [
    {
      hip: [100, 116],
      shoulder: [100, 72],
      head: [100, 52],
      elbow: [77, 83],
      hand: [83, 65],
      knee: [95, 148],
      foot: [100, 180],
    },
    {
      hip: [80, 141],
      shoulder: [94, 101],
      head: [96, 81],
      elbow: [71, 112],
      hand: [77, 94],
      knee: [118, 145],
      foot: [100, 180],
    },
  ],
  'romanian-deadlift': [
    {
      hip: [95, 116],
      shoulder: [95, 72],
      head: [95, 52],
      elbow: [104, 99],
      hand: [109, 125],
      knee: [98, 148],
      foot: [100, 180],
    },
    {
      hip: [73, 118],
      shoulder: [120, 129],
      head: [139, 123],
      elbow: [123, 150],
      hand: [125, 172],
      knee: [89, 148],
      foot: [100, 180],
    },
  ],
  'barbell-bench-press': [
    {
      hip: [119, 135],
      shoulder: [73, 135],
      head: [51, 132],
      elbow: [81, 104],
      hand: [80, 76],
      knee: [146, 143],
      foot: [147, 180],
    },
    {
      hip: [119, 135],
      shoulder: [73, 135],
      head: [51, 132],
      elbow: [101, 137],
      hand: [83, 115],
      knee: [146, 143],
      foot: [147, 180],
    },
  ],
  'incline-dumbbell-press': [
    {
      hip: [115, 143],
      shoulder: [86, 109],
      head: [72, 91],
      elbow: [99, 80],
      hand: [110, 54],
      knee: [145, 145],
      foot: [147, 180],
    },
    {
      hip: [115, 143],
      shoulder: [86, 109],
      head: [72, 91],
      elbow: [114, 118],
      hand: [118, 90],
      knee: [145, 145],
      foot: [147, 180],
    },
  ],
  'seated-dumbbell-shoulder-press': [
    {
      hip: [100, 133],
      shoulder: [100, 88],
      head: [100, 68],
      elbow: [119, 61],
      hand: [113, 33],
      knee: [135, 137],
      foot: [137, 180],
    },
    {
      hip: [100, 133],
      shoulder: [100, 88],
      head: [100, 68],
      elbow: [130, 95],
      hand: [133, 66],
      knee: [135, 137],
      foot: [137, 180],
    },
  ],
  'neutral-grip-lat-pulldown': [
    {
      hip: [100, 133],
      shoulder: [100, 88],
      head: [91, 67],
      elbow: [115, 60],
      hand: [121, 31],
      knee: [135, 137],
      foot: [137, 180],
    },
    {
      hip: [100, 133],
      shoulder: [94, 92],
      head: [85, 71],
      elbow: [122, 116],
      hand: [121, 85],
      knee: [135, 137],
      foot: [137, 180],
    },
  ],
  'assisted-pull-up': [
    {
      hip: [100, 127],
      shoulder: [100, 84],
      head: [94, 64],
      elbow: [119, 58],
      hand: [120, 30],
      knee: [104, 155],
      foot: [83, 175],
    },
    {
      hip: [100, 96],
      shoulder: [100, 53],
      head: [94, 33],
      elbow: [131, 57],
      hand: [120, 30],
      knee: [104, 124],
      foot: [83, 144],
    },
  ],
  'chest-supported-row': [
    {
      hip: [86, 127],
      shoulder: [115, 94],
      head: [130, 78],
      elbow: [126, 121],
      hand: [130, 149],
      knee: [76, 151],
      foot: [68, 180],
    },
    {
      hip: [86, 127],
      shoulder: [115, 94],
      head: [130, 78],
      elbow: [88, 100],
      hand: [109, 120],
      knee: [76, 151],
      foot: [68, 180],
    },
  ],
}

function Figure({ pose, headRotation = 0 }: { pose: Pose; headRotation?: number }) {
  const { hip, shoulder, head, elbow, hand, knee, foot } = pose
  const points = (items: Point[]) => items.map((point) => point.join(',')).join(' ')
  return (
    <>
      <polyline
        points={points([hip, [knee[0] - 15, knee[1]], [foot[0] - 15, foot[1]]])}
        stroke="#47616d"
        strokeWidth="12"
      />
      <polyline points={points([hip, knee, foot])} stroke="#91a6af" strokeWidth="13" />
      <path d={`M${foot[0] - 22} ${foot[1]}h17m-2 0h18`} stroke="#d6b77b" strokeWidth="8" />
      <polyline
        points={points([shoulder, [elbow[0] - 13, elbow[1]], [hand[0] - 13, hand[1]]])}
        stroke="#9e795c"
        strokeWidth="9"
      />
      <line
        x1={hip[0]}
        y1={hip[1]}
        x2={shoulder[0]}
        y2={shoulder[1]}
        stroke="#55847a"
        strokeWidth="25"
      />
      <line
        x1={hip[0]}
        y1={hip[1]}
        x2={shoulder[0]}
        y2={shoulder[1]}
        stroke="#bca76f"
        strokeWidth="4"
      />
      <g transform={`rotate(${headRotation} ${head[0]} ${head[1]})`}>
        <rect x={head[0] - 12} y={head[1] - 13} width="24" height="25" fill="#d5af89" />
        <path d={`M${head[0] - 14} ${head[1] - 10}v-7h26v9h-7`} stroke="#263b49" strokeWidth="7" />
        <path d={`M${head[0] - 10} ${head[1]}h8m4 0h9`} stroke="#263b49" strokeWidth="6" />
      </g>
      <polyline points={points([shoulder, elbow, hand])} stroke="#d5af89" strokeWidth="10" />
    </>
  )
}

export default function ExerciseMotion({
  id,
  label,
  paused,
}: {
  id: string
  label: string
  paused: boolean
}) {
  const endpoints = poses[id] ?? poses['barbell-back-squat']
  const frames = Array.from({ length: 16 }, (_, index) => {
    const amount = (1 - Math.cos((index / 16) * Math.PI * 2)) / 2
    const blend = (key: keyof Pose): Point => [
      Math.round(endpoints[0][key][0] + (endpoints[1][key][0] - endpoints[0][key][0]) * amount),
      Math.round(endpoints[0][key][1] + (endpoints[1][key][1] - endpoints[0][key][1]) * amount),
    ]
    return {
      hip: blend('hip'),
      shoulder: blend('shoulder'),
      head: blend('head'),
      elbow: blend('elbow'),
      hand: blend('hand'),
      knee: blend('knee'),
      foot: blend('foot'),
    }
  })
  return (
    <div
      className="gym-motion"
      style={{ '--motion-state': paused ? 'paused' : 'running' } as CSSProperties}
    >
      <svg
        viewBox="0 0 220 210"
        fill="none"
        shapeRendering="crispEdges"
        role="img"
        aria-label={label}
      >
        <path d="M36 191h148" stroke="#354d59" strokeWidth="3" />
        {frames.map((pose, index) => (
          <g
            key={index}
            className={`gym-pose gym-pose-${index}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <Figure pose={pose} headRotation={id === 'barbell-bench-press' ? -90 : 0} />
          </g>
        ))}
      </svg>
    </div>
  )
}
