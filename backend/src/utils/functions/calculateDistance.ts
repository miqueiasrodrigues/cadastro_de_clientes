interface Coordinate {
  x: number;
  y: number;
}

export const calculateDistance = (
  coord1: Coordinate,
  coord2: Coordinate
): number => {
  const dx = coord1.x - coord2.x;
  const dy = coord1.y - coord2.y;
  return Math.sqrt(dx * dx + dy * dy);
};
