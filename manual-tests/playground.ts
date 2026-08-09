import { analyzePGN } from 'chessalyzer';
import { generateComparisonHeatmap, printHeatmap, tileTracker } from 'chessalyzer/trackers';

// /*
//  * Basic example of analyzing a PGN file. In the most simple form (no filters, no trackers),
//  * it will only return a summary of the games in the PGN file.
//  */

// const result = await analyzePGN('pgn/asorted-games.pgn');
// console.log(result);

// const result2 = await analyzePGN('pgn/asorted-games.pgn', {
//     filter: (game) => Number(game.headers?.WhiteElo ?? 0) > 1500,
// });
// console.log(result2);

// const tiles = tileTracker();
// const result3 = await analyzePGN('pgn/asorted-games.pgn', {
//     filter: (game) => Number(game.headers?.WhiteElo ?? 0) > 1500,
//     trackers: [tiles],
// });
// console.log(result3);
// console.log(tiles.state);

const high = tileTracker();
const low = tileTracker();
await analyzePGN('pgn/lichess_db_standard_rated_2013-12.pgn', {
    runs: [
        { trackers: [high], filter: (game) => Number(game.headers?.WhiteElo) > 2000 },
        { trackers: [low], filter: (game) => Number(game.headers?.WhiteElo) < 1300 },
    ],
});

const comparison = generateComparisonHeatmap(high.state, low.state, ({ data, square }) => {
    const cell = data.squares[square];
    return (cell.w.total.occupiedFor * 100) / data.movesTotal;
});

console.log(high.state.squares['f3']);
console.log(low.state.squares['f3']);
printHeatmap(comparison);
