import IClient from "src/app/models/interfaces/Client";
import { calculateDistance } from "./calculateDistance";

export const nearestNeighborAlgorithm = (client: IClient[]): IClient[] => {
  const unvisited = [...client];
  const route: IClient[] = [];
  let current: IClient = unvisited[0];
  unvisited.splice(0, 1);
  route.push(current);

  while (unvisited.length > 0) {
    let nearest: IClient | null = null;
    let minDistance = Infinity;

    for (const client of unvisited) {
      const distance = calculateDistance(
        { x: current.x_coordinate, y: current.y_coordinate },
        { x: client.x_coordinate, y: client.y_coordinate }
      );
      if (distance < minDistance) {
        nearest = client;
        minDistance = distance;
      }
    }

    if (nearest) {
      current = nearest;
      const index = unvisited.indexOf(nearest);
      unvisited.splice(index, 1);
      route.push(current);
    }
  }

  return route;
};
