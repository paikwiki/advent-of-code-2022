import { NEW_LINE, SPACE } from "../constants";
import { filter, map, reduce } from "../lib/arrayKit";
import { split } from "../lib/stringKit";
import { log } from "../utilities";

type RockScissorsPaperRound = ["A" | "B" | "C", "X" | "Y" | "Z"];
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

export const day02 = (rawData: string) => {
  const rockScissorsPaperRounds = map<string, RockScissorsPaperRound>({
    array: filter({
      array: split({ str: rawData, separator: NEW_LINE }),
      condition: (str) => str.length > 0,
    }),
    mapper: (roundString) =>
      split({ str: roundString, separator: SPACE }) as RockScissorsPaperRound,
  });

  // part 1
  const SHAPE_NAMES_PART_ONE: Record<OppenentCode | MyCode, Shape> = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
  } as const;

  const partOneAnswer = reduce({
    array: rockScissorsPaperRounds,
    reducer: (acc, [opponent, mine]) =>
      acc +
      judgePartOne({
        opponent: SHAPE_NAMES_PART_ONE[opponent],
        mine: SHAPE_NAMES_PART_ONE[mine],
      }),
    initialValue: 0,
  });
  log(`part 1: ${partOneAnswer}`);

  // part 2
  const SHAPE_NAMES_PART_TWO: Record<OppenentCode, Shape> = {
    A: "rock",
    B: "paper",
    C: "scissors",
  } as const;

  const partTwoAnswer = reduce({
    array: rockScissorsPaperRounds,
    reducer: (acc, [opponentCode, myCode]) =>
      acc +
      judgePartTwo({
        opponent: SHAPE_NAMES_PART_TWO[opponentCode],
        myCode,
      }),
    initialValue: 0,
  });
  log(`part 2: ${partTwoAnswer}`);
};

const MY_SHAPE_MEANINGS: Record<MyCode, GameScore> = {
  X: GAME_SCORES.lose,
  Y: GAME_SCORES.draw,
  Z: GAME_SCORES.win,
};

const judgePartOne = ({ opponent, mine }: { opponent: Shape; mine: Shape }) =>
  (opponent === mine
    ? GAME_SCORES.draw
    : MY_SHAPE_FOR_WIN[opponent] === mine
    ? GAME_SCORES.win
    : GAME_SCORES.lose) + SHAPE_SCORES[mine];

const judgePartTwo = ({
  opponent,
  myCode,
}: {
  opponent: Shape;
  myCode: MyCode;
}) => {
  const myShapeForWin = MY_SHAPE_FOR_WIN[opponent];
  const myShapeForLose = MY_SHAPE_FOR_LOSE[opponent];

  const gameScore = MY_SHAPE_MEANINGS[myCode];
  const myShape =
    gameScore === GAME_SCORES.draw
      ? opponent
      : gameScore === GAME_SCORES.win
      ? myShapeForWin
      : myShapeForLose;
  return SHAPE_SCORES[myShape] + gameScore;
};
