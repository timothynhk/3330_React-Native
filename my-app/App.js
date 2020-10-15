import React from 'react';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Box from './Box';
import { Dimensions, StyleSheet, StatusBar } from 'react-native';

const { width, height } = Dimensions.get("screen");
const boxSize = Math.trunc(Math.max(width, height) * 0.075);
const initialBox = Matter.Bodies.rectangle(width / 2, height / 2, boxSize, boxSize);
const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize,{ isStatic: true });
const engine = Matter.Engine.create({ enableSleeping: false });
const world = engine.world;
const [block1Height, block2Height] = generateBlocks();
const block1 = Matter.Bodies.rectangle( width - (width / 2), block1Height / 2, 100, block1Height, { isStatic: true });
const block2 = Matter.Bodies.rectangle( width - (width / 2), height - (block2Height / 2), 100, block2Height, { isStatic: true });
const [block3Height, block4Height] = generateBlocks();
const block3 = Matter.Bodies.rectangle( width * 2 - (width / 2), block3Height / 2, 100, block3Height, { isStatic: true });
const block4 = Matter.Bodies.rectangle( width * 2 - (width / 2), height - (block4Height / 2), 100, block4Height, { isStatic: true });
const ceiling = Matter.Bodies.rectangle(width / 2,  - boxSize / 2, width, boxSize,{ isStatic: true });
Matter.World.add(world, [initialBox, floor, ceiling, block1, block2, block3, block4]);

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let initialBox = entities.initialBox.body;
  touches.filter(t => t.type === "press").forEach(t => {
    Matter.Body.applyForce( initialBox, initialBox.position, {x: 0.00, y: -0.10});
  });
  for(let i=1; i<=4; i++){
    if (entities["block" + i].body.position.x <= -1 * (100/ 2)){
      Matter.Body.setPosition( entities["block" + i].body, {x: width * 2 - (100 / 2), y: entities["block" + i].body.position.y});
    } else {
      Matter.Body.translate( entities["block" + i].body, {x: -1, y: 0});
    }
  }
  Matter.Engine.update(engine, time.delta);
  return entities;
};
export default class App extends React.Component {
  render() {
    return (
      <GameEngine
        style={styles.container}
        systems={[Physics]}
        entities={
          {physics: {
            engine: engine,
            world: world
          }, initialBox: {
            body: initialBox,
            size: [boxSize, boxSize],
            color: 'red',
            renderer: Box
          }, floor: {
            body: floor,
            size: [width, boxSize],
            color: "green",
            renderer: Box
          }, ceiling: { 
            body: ceiling, 
            size: [width, boxSize], 
            color: "blue", 
            renderer: Box 
          }, block1: {
            body: block1,
            size: [100, block1Height],
            color: "green",
            renderer: Box
          }, block2: {
            body: block2,
            size: [100, block2Height],
            color: "green",
            renderer: Box
          }, block3: {
            body: block3,
            size: [100, block3Height],
            color: "green",
            renderer: Box
          }, block4: {
            body: block4,
            size: [100, block4Height],
            color: "green",
            renderer: Box
          }}
        }>
          <StatusBar hidden={true} />
        </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function randomBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateBlocks () {
  let topPipeHeight = randomBetween(100, (height / 2) - 100);
  let bottomPipeHeight = height - topPipeHeight - 200;
  let sizes = [topPipeHeight, bottomPipeHeight]
  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }
  return sizes;
}