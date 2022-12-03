import { NEW_LINE, SPACE } from "../constants";
import { filter, map, reduce } from "../lib/arrayKit";
import { compare, plus, same } from "../lib/operatorKit";
import { split, stringLength } from "../lib/stringKit";
import { log } from "../utilities";

type RockScissorsPaperGame = ["A" | "B" | "C", "X" | "Y" | "Z"];
type Shape = "rock" | "paper" | "scissors";
type OppenentCode = "A" | "B" | "C";
type MyCode = "X" | "Y" | "Z";
type GameScore = 0 | 3 | 6;
type ShapeScore = 1 | 2 | 3;

const MY_SHAPE_FOR_WIN: Record<Shape, Shape> = {
  rock: "paper",
  scissors: "rock",
  paper: "scissors",
} as const;

const MY_SHAPE_FOR_LOSE: Record<Shape, Shape> = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
} as const;

const SHAPE_SCORES: Record<Shape, ShapeScore> = {
  rock: 1,
  paper: 2,
  scissors: 3,
} as const;

const GAME_SCORES: Record<"win" | "draw" | "lose", GameScore> = {
  win: 6,
  draw: 3,
  lose: 0,
} as const;

// part 1 only
const SHAPE_NAMES_PART_ONE: Record<OppenentCode | MyCode, Shape> = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
} as const;

// part 2 only
const SHAPE_NAMES_PART_TWO: Record<OppenentCode, Shape> = {
  A: "rock",
  B: "paper",
  C: "scissors",
} as const;

const SCORE_THAT_MY_SHAPE_MEANS: Record<MyCode, GameScore> = {
  X: GAME_SCORES.lose,
  Y: GAME_SCORES.draw,
  Z: GAME_SCORES.win,
};

export const day02 = (rawData: string) => {
  const rockScissorsPaperGames = map<string, RockScissorsPaperGame>({
    array: filter({
      array: split({ str: rawData, separator: NEW_LINE }),
      condition: (str) =>
        compare({ target: stringLength(str), greaterThan: 0 }),
    }),
    mapper: (roundString) =>
      split({ str: roundString, separator: SPACE }) as RockScissorsPaperGame,
  });

  // part 1
  const partOneAnswer = reduce({
    array: rockScissorsPaperGames,
    reducer: (acc, [opponent, mine]) =>
      plus(
        acc,
        judgePartOne({
          opponent: SHAPE_NAMES_PART_ONE[opponent],
          mine: SHAPE_NAMES_PART_ONE[mine],
        })
      ),
    initialValue: 0,
  });
  log(`part 1: ${partOneAnswer}`);

  // part 2
  const partTwoAnswer = reduce({
    array: rockScissorsPaperGames,
    reducer: (acc, [opponentCode, myCode]) =>
      plus(
        acc,
        judgePartTwo({
          opponent: SHAPE_NAMES_PART_TWO[opponentCode],
          myCode,
        })
      ),
    initialValue: 0,
  });
  log(`part 2: ${partTwoAnswer}`);
};

const judgePartOne = ({ opponent, mine }: { opponent: Shape; mine: Shape }) =>
  (opponent === mine
    ? GAME_SCORES.draw
    : same(MY_SHAPE_FOR_WIN[opponent], mine)
    ? GAME_SCORES.win
    : GAME_SCORES.lose) + SHAPE_SCORES[mine];

const judgePartTwo = ({
  opponent,
  myCode,
}: {
  opponent: Shape;
  myCode: MyCode;
}) => {
  const gameScore = SCORE_THAT_MY_SHAPE_MEANS[myCode];
  const myShape = same(gameScore, GAME_SCORES.draw)
    ? opponent
    : same(gameScore, GAME_SCORES.win)
    ? MY_SHAPE_FOR_WIN[opponent]
    : MY_SHAPE_FOR_LOSE[opponent];

  return plus(SHAPE_SCORES[myShape], gameScore);
};
