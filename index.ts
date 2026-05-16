function findContiguousSeats(
  room: CinemaRoom
): [number, number, number] | null {

  for (let row = 0; row < room.length; row++) {

    for (let column = 0; column < room[row].length - 1; column++) {

      if (
        room[row][column] === 0 &&
        room[row][column + 1] === 0
      ) {

        console.log(
          `Asientos contiguos encontrados en fila ${row}: ${column} y ${column + 1}`
        );

        return [row, column, column + 1];
      }
    }
  }

  console.log("No hay asientos contiguos disponibles");

  return null;
}
