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

const A = "A";
const Z = "Z";
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
      // TODO: for문 제거!
      for (let i = 0; i < getStackCountInCertainLine(line); i++) {
        const targetIndex = plus(multiply(i, SPACE_COUNT_BETWEEN_STACKS), 1);
        const crate = line[targetIndex];

        if (isCapitalAlphabet(crate))
          mutateForPush({ array: stacks[i], item: crate });
      }
    },
  });

  const instructions = map({
    array: getLines(instructionRawData),
    mapper: (line) => {
      const [_1, crateCountString, _2, sourceStackName, _3, destStackName] =
        split({ str: line, separator: SPACE });
      return {
        crateQuantity: parseInt(crateCountString),
        sourceStacIndex: minus(parseInt(sourceStackName), 1),
        destStackIndex: minus(parseInt(destStackName), 1),
      };
    },
  });

  // part 1
  const partOneStacks = map({ array: stacks, mapper: (stack) => [...stack] });
  forEach({
    array: instructions,
    iterateFunction: ({ crateQuantity, sourceStacIndex, destStackIndex }) => {
      const popped = mutateForPopN({
        array: partOneStacks[sourceStacIndex],
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
    iterateFunction: ({ crateQuantity, sourceStacIndex, destStackIndex }) => {
      const popped = mutateForPopN({
        array: partTwoStack[sourceStacIndex],
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
    target: charCodeAt({ str: charatcter, index: 0 }),
    greaterThanOrEqual: charCodeAt({ str: A, index: 0 }),
  }) &&
  compareWithEqual({
    target: charCodeAt({ str: Z, index: 0 }),
    greaterThanOrEqual: charCodeAt({ str: charatcter, index: 0 }),
  });
