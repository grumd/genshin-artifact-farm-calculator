import {
  Button,
  IconButton,
  Text,
  Box,
  FormControl,
  FormLabel,
  VStack,
  NumberInput,
  HStack,
  NumberInputField,
  CloseButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Link,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useState, useEffect, memo } from "react";
import { MdAddCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import _ from "lodash/fp";

import { allowedMainStats, allowedSubStats } from "../data/combinations";
import { MainStats, SubStats, Types } from "../data/enums";
import WorkerCalculateChance from "../utils/calculateChance.worker";
// import { calculateChance } from "../utils/calculateChance";

import { Select } from "./Select";
import { getMeaningfulPercents } from "../utils/formatNumber";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface FormData {
  type: Types;
  mainStat?: MainStats;
  subStats: [SubStats, number][];
}

interface ChartDataEntry {
  resin: number;
  chance: number;
}

const workerInstance = WorkerCalculateChance();

const typeOptions: { value: Types; label: string }[] = _.values(Types).map(
  (type) => ({ label: type, value: type })
);

const TooltipContainer = styled.div`
  border-radius: 5px;
  background: #313743;
  padding: 5px 10px;
  border: 1px solid white;
`;

const QuestionIconContainer = styled.div`
  cursor: pointer;
`;

const ResultsBox = memo(
  ({ chance, chartData }: { chance: number; chartData: ChartDataEntry[] }) => {
    return (
      <Box
        margin={1}
        maxW="95%"
        width="lg"
        borderWidth="1px"
        borderRadius="lg"
        padding={2}
        paddingLeft={4}
      >
        <Flex alignItems="baseline" flexFlow="row nowrap">
          <Text>Chance in one run (20 resin):</Text>
          <Text
            paddingLeft={2}
            paddingRight={2}
            fontSize="large"
            fontWeight="bold"
          >
            {getMeaningfulPercents(chance)}
          </Text>
          <Popover>
            <PopoverTrigger>
              <QuestionIconContainer>
                <FaRegQuestionCircle />
              </QuestionIconContainer>
            </PopoverTrigger>
            <PopoverContent color="black" width={"70%"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text fontWeight="bold" marginRight={6}>
                  This calculation assumes the following:
                </Text>
                <Text>5* artifacts upgraded to +20;</Text>
                <Text>
                  1.07 artifacts per run on average;{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit"
                  >
                    Source
                  </Link>
                </Text>
                <Text>50% chance to get one of the two sets;</Text>
                <Text>20% chance to get the correct artifact type;</Text>
                <Text>
                  Chance to get the correct main stat and sub-stats;{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://genshin-impact.fandom.com/wiki/Artifacts/Distribution"
                  >
                    Source 1
                  </Link>
                  {", "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://docs.google.com/spreadsheets/d/1sYQrV5Yp_QTVEKMLWquMu0mDgHhOO_Rh2LfcWdS_Eno/edit"
                  >
                    Source 2
                  </Link>
                </Text>
                <Text marginTop={2}>
                  Note: chance to get 4 initial sub-stats is assumed to be 25%.
                </Text>
                <Text>
                  Contact me at{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://www.reddit.com/message/compose/?to=grumd"
                  >
                    /u/grumd
                  </Link>{" "}
                  if you have more accurate information.
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        <Text>Cumulative chance to get this artifact at least once:</Text>
        {chance > 0 && !_.isEmpty(chartData) && (
          <ResponsiveContainer width="100%" aspect={2.5}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
            >
              <defs>
                <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                fillOpacity={1}
                fill="url(#colorGrad)"
                type="monotone"
                dataKey="chance"
                stroke="#8884d8"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="resin" />
              <YAxis
                domain={[0, 1]}
                tickFormatter={(value) => (value * 100).toFixed(0) + "%"}
              />
              <Tooltip
                isAnimationActive={false}
                content={({ payload }) => {
                  const item = payload?.[0]?.payload;
                  if (item) {
                    return (
                      <TooltipContainer>
                        <div>Resin: {item.resin}</div>
                        <div>Days: {item.resin / 160}</div>
                        <div>Chance: {getMeaningfulPercents(item.chance)}</div>
                      </TooltipContainer>
                    );
                  }
                  return null;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    );
  }
);

export function ArtifactForm() {
  const [formData, setFormData] = useState<FormData>({
    type: Types.Flower,
    subStats: [],
  });
  const [chance, setChance] = useState<number | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartDataEntry[]>([]);

  const onChangeType = (value: Types) => {
    setFormData({ type: value, subStats: [] }); // reset all
  };

  const onChangeMainStat = (value: MainStats) => {
    setFormData((form) => ({ ...form, mainStat: value, subStats: [] })); // reset sub stats
  };

  const mainStatOptions = allowedMainStats[formData.type].map((mainStat) => ({
    label: mainStat,
    value: mainStat,
  }));

  const subStatList = formData.mainStat
    ? allowedSubStats[formData.mainStat]
    : [];
  const subStatOptions = subStatList
    .filter((subStat) => !formData.subStats.find(([s]) => s === subStat))
    .map((subStat) => ({
      label: subStat,
      value: subStat,
    }));

  useEffect(() => {
    if (!formData.mainStat) {
      setFormData((form) => ({ ...form, mainStat: mainStatOptions[0].value }));
    }
  }, [formData.mainStat, mainStatOptions]);

  const onAddSubStats = () => {
    if (subStatOptions.length) {
      setFormData((form) => ({
        ...form,
        subStats: [...form.subStats, [subStatOptions[0].value, 0]],
      }));
    }
  };

  const onChangeSubStat = (subStat: SubStats) => (value: SubStats) => {
    setFormData((form) => ({
      ...form,
      subStats: form.subStats.map((pair) =>
        pair[0] === subStat ? [value, 0] : pair
      ),
    }));
  };

  const onChangeSubStatNumber =
    (subStat: SubStats) => (stringValue: string, value: number) => {
      setFormData((form) => ({
        ...form,
        subStats: form.subStats.map((pair) =>
          pair[0] === subStat ? [subStat, value] : pair
        ),
      }));
    };

  const onRemoveSubStat = (subStat: SubStats) => {
    setFormData((form) => ({
      ...form,
      subStats: form.subStats.filter((pair) => pair[0] !== subStat),
    }));
  };

  const onCalculate = async () => {
    if (formData.mainStat) {
      setCalculating(true);
      const chance: number = await workerInstance.calculateChance({
        type: formData.type,
        mainStat: formData.mainStat,
        subStats: formData.subStats.reduce((acc, [subStat, value]) => {
          return {
            ...acc,
            [subStat]: value,
          };
        }, {}),
      });
      setCalculating(false);
      // const chance = calculateChance({
      //   type: formData.type,
      //   mainStat: formData.mainStat,
      //   subStats: formData.subStats.reduce((acc, [subStat, value]) => {
      //     return {
      //       ...acc,
      //       [subStat]: value,
      //     };
      //   }, {}),
      // });
      const invertedChance = 1 - chance;
      const cumulativeChartData: { resin: number; chance: number }[] = [];
      let resinSpent = 0,
        cumulativeInvertedChance = 1;
      // 2920 is 365 days of 8 domain runs per day
      for (let i = 0; i < 2920; i++) {
        if (cumulativeInvertedChance < 0.05) {
          break;
        }
        resinSpent += 20;
        cumulativeInvertedChance *= invertedChance;
        cumulativeChartData.push({
          resin: resinSpent,
          chance: 1 - cumulativeInvertedChance,
        });
      }
      setChartData(cumulativeChartData);
      setChance(chance);
    }
  };

  return (
    <Flex flexFlow="column wrap" width="100%" alignItems="center">
      <Box
        margin={1}
        maxW="95%"
        width="lg"
        borderWidth="1px"
        borderRadius="lg"
        padding={2}
      >
        <VStack padding="2" spacing="4">
          <FormControl id="type">
            <FormLabel>Artifact type:</FormLabel>
            <Select
              value={formData.type}
              items={typeOptions}
              onChange={onChangeType}
            />
          </FormControl>
          <FormControl id="mainStat">
            <FormLabel>Main stat:</FormLabel>
            <Select
              value={formData.mainStat}
              items={mainStatOptions}
              onChange={onChangeMainStat}
            />
          </FormControl>
          <FormControl id="subStat">
            <FormLabel>Sub stats (optional):</FormLabel>
            <VStack alignItems="start" width="100%">
              {formData.subStats.map((value, index) => {
                const [subStat, numValue] = value;
                return (
                  <HStack key={`substat-${index}`} width="100%">
                    <FormControl id={`substat-${index}-name`}>
                      <Select
                        value={subStat}
                        items={[
                          { label: subStat, value: subStat },
                          ...subStatOptions,
                        ]}
                        onChange={onChangeSubStat(subStat)}
                      />
                    </FormControl>
                    <Text fontWeight="bold" fontSize="large">
                      {">="}
                    </Text>
                    <FormControl id={`substat-${index}-value`}>
                      <NumberInput
                        value={numValue}
                        onChange={onChangeSubStatNumber(subStat)}
                      >
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <CloseButton
                      colorScheme="blue"
                      onClick={() => onRemoveSubStat(subStat)}
                    />
                  </HStack>
                );
              })}
              <FormControl>
                {_.keys(formData.subStats).length < 4 && (
                  <IconButton
                    color="white"
                    fontSize="2xl"
                    colorScheme="purple"
                    aria-label="Add substat"
                    onClick={onAddSubStats}
                    icon={<MdAddCircle />}
                  />
                )}
              </FormControl>
            </VStack>
          </FormControl>
          <Button
            disabled={!formData.mainStat}
            colorScheme="pink"
            isLoading={calculating}
            onClick={onCalculate}
          >
            Calculate (may take several seconds)
          </Button>
        </VStack>
      </Box>
      {!_.isNil(chance) && (
        <ResultsBox chance={chance} chartData={chartData}></ResultsBox>
      )}
    </Flex>
  );
}
