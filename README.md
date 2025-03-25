# Ochy - AI Gait Analysis Platform

A Next.js application that analyzes running gait mechanics using AI-powered pose tracking.

## Features

- **Real-time Pose Tracking**: Uses TensorFlow.js MoveNet model to detect body joints
- **Joint Angle Analysis**: Calculates and visualizes knee, hip, and ankle angles
- **Gait Assessment**: Identifies issues like pelvic drop and pronation/supination
- **Interactive UI**: Explore different metrics and get personalized recommendations
- **Visualization Tools**: See joint angles, metrics, graphs, and running style analysis

## AI Pose Tracking

The platform uses TensorFlow.js to perform real-time pose estimation on running videos. Key features:

1. **Skeleton Visualization**: Shows the runner's pose with color-coded skeleton (red for left side, green for right side)
2. **Joint Angle Calculation**: Automatically measures angles between key joints during running
3. **Biomechanical Analysis**: Evaluates the runner's form based on ideal ranges for each joint
4. **Personalized Recommendations**: Provides exercise suggestions based on identified issues

## Technical Implementation

- **MoveNet Model**: Lightweight pose estimation model that balances accuracy and speed
- **Joint Detection**: Identifies 17 keypoints of the human body
- **Angle Calculation**: Uses vector mathematics to calculate angles between joints
- **Performance Optimization**: Frame skipping and efficient rendering for smooth operation

## Tech Stack

- Next.js 15
- TensorFlow.js
- React
- Tailwind CSS
- TypeScript

## How to Use

1. Upload a video of a person running (side view or back view)
2. The system automatically tracks the runner's pose
3. Review the analysis of joint angles and biomechanics
4. Explore different metrics (knees, hips, ankles)
5. Get personalized recommendations to improve running form

## Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## License

MIT
