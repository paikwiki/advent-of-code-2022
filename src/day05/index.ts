import {
  DOUBLE_NEW_LINES,
  EMPTY_CHARACTER,
  NEW_LINE,
  SPACE,
} from "../constants";
import {
  arrayLength,
  forEach,
  join,
  map,
  reduce,
  reverse,
  splice,
} from "../lib/arrayKit";
import {
  compare,
  compareWithEqual,
  divide,
  minus,
  multiply,
  plus,
} from "../lib/operatorKit";
import { charCodeAt, split, stringLength } from "../lib/stringKit";
import { createArrayFilledWithNull, getLines, log } from "../utilities";

const SPACE_COUNT_BETWEEN_STACKS = 4;

export const day05 = (rawData: string) => {
  const [stackDiagram, instructionRawData] = split({
    str: rawData,
    separator: DOUBLE_NEW_LINES,
  });

  const diagramLines = split({ str: stackDiagram, separator: NEW_LINE });
  const stackCount = reduce({
    array: diagramLines,
    reducer: (maxStackCount, line) => {
      const count = getStackCountInCertainLine(line);

      return compare({ target: count, greaterThan: maxStackCount })
        ? count
        : maxStackCount;
    },
    initialValue: 0,
  });

  const reversedDiagramLines = splice({
    array: reverse(diagramLines),
    startAt: 1,
    deleteCount: minus(arrayLength(diagramLines), 1),
  });
  const stacks = createArrayFilledWithNull(stackCount).map<string[]>(() => []);

  forEach({
    array: reversedDiagramLines,
    iterateFunction: (line) => {
      reduce({
        array: map({
          array: createArrayFilledWithNull(getStackCountInCertainLine(line)),
          mapper: (_, index) => index,
        }),
        reducer: (_, index) => {
          const target = plus(multiply(index, SPACE_COUNT_BETWEEN_STACKS), 1);
          const crate = line[target];
          if (isCapitalAlphabet(crate))
            mutateForPush({ array: stacks[index], item: crate });

          return _;
        },
        initialValue: null,
      });
    },
  });

  const instructions = map({
    array: getLines(instructionRawData),
    mapper: (line) => {
      const [_1, crateQuantityString, _2, sourceStackName, _3, destStackName] =
        split({ str: line, separator: SPACE });
      return {
        crateQuantity: parseInt(crateQuantityString),
        sourceStackIndex: minus(parseInt(sourceStackName), 1),
        destStackIndex: minus(parseInt(destStackName), 1),
      };
    },
  });

  // part 1
  const partOneStacks = map({ array: stacks, mapper: (stack) => [...stack] });
  forEach({
    array: instructions,
    iterateFunction: ({ crateQuantity, sourceStackIndex, destStackIndex }) => {
      const popped = mutateForPopN({
        array: partOneStacks[sourceStackIndex],
        quantity: crateQuantity,
      });
      mutateForPushAll({ array: partOneStacks[destStackIndex], items: popped });
    },
  });
  const partOneAnswer = join({
    array: map({
      array: partOneStacks,
      mapper: (stack) => mutateForPopN({ array: [...stack], quantity: 1 })[0],
    }),
    separator: EMPTY_CHARACTER,
  });

  log(`part 1: ${partOneAnswer}`);

  // part 2
  const partTwoStack = map({ array: stacks, mapper: (stack) => [...stack] });
  forEach({
    array: instructions,
    iterateFunction: ({ crateQuantity, sourceStackIndex, destStackIndex }) => {
      const popped = mutateForPopN({
        array: partTwoStack[sourceStackIndex],
        quantity: crateQuantity,
      });
      mutateForPushAll({
        array: partTwoStack[destStackIndex],
        items: reverse(popped),
      });
    },
  });
  const partTwoAnswer = join({
    array: map({
      array: partTwoStack,
      mapper: (stack) => mutateForPopN({ array: [...stack], quantity: 1 })[0],
    }),
    separator: EMPTY_CHARACTER,
  });

  log(`part 2: ${partTwoAnswer}`);
};

const mutateForPush = <T>({ array, item }: { array: T[]; item: T }) =>
  array.push(item);

const mutateForPushAll = <T>({ array, items }: { array: T[]; items: T[] }) =>
  array.push(...reverse(items));

const mutateForPopN = <T>({
  array,
  quantity,
}: {
  array: T[];
  quantity: number;
}) => array.splice(minus(arrayLength(array), quantity), quantity);

const getStackCountInCertainLine = (line: string) =>
  divide(plus(stringLength(line), 1), SPACE_COUNT_BETWEEN_STACKS);

const isCapitalAlphabet = (charatcter: string) =>
  compareWithEqual({
    target: characterCodeOf(charatcter),
    greaterThanOrEqual: characterCodeOf("A"),
  }) &&
  compareWithEqual({
    target: characterCodeOf("Z"),
    greaterThanOrEqual: characterCodeOf(charatcter),
  });

const characterCodeOf = (character: string) =>
  charCodeAt({ str: character, index: 0 });
