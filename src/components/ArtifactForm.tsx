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
  Link,
  Switch,
} from "@chakra-ui/react";
import styled from "styled-components";
import { useState, useEffect, memo, ChangeEvent } from "react";
import { MdAddCircle } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import _ from "lodash/fp";

import { Popup } from "./Popup";
import { allowedMainStats, allowedSubStats } from "../data/combinations";
import { MainStats, Stats, SubStats, Types } from "../data/enums";
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

type SubStatFieldTypes = SubStats | typeof CRIT_VALUE;

interface FormData {
  acceptBothSets: boolean;
  type: Types;
  mainStat?: MainStats;
  subStats: [SubStatFieldTypes, number, string][];
}

interface ChartDataEntry {
  resin: number;
  chance: number;
}

const workerInstance = WorkerCalculateChance();

const CRIT_VALUE = "critValue";

const typeOptions: { value: Types; label: string }[] = _.values(Types).map(
  (type) => ({ label: type, value: type })
);

const mapSubStatOption = (subStat: SubStatFieldTypes) => ({
  label: subStat === CRIT_VALUE ? "CRIT Value (2xRate% + DMG%)" : subStat,
  value: subStat,
});

const TooltipContainer = styled.div`
  border-radius: 5px;
  background: #313743;
  padding: 5px 10px;
  border: 1px solid white;
`;

const QuestionIconContainer = styled.div`
  cursor: pointer;
  font-size: 120%;
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
        <Flex alignItems="center" flexFlow="row nowrap">
          <Text>Chance in one run (20 resin):</Text>
          <Text
            paddingLeft={2}
            paddingRight={2}
            fontSize="large"
            fontWeight="bold"
          >
            {getMeaningfulPercents(chance)}
          </Text>
          <Popup
            target={
              <QuestionIconContainer>
                <FaRegQuestionCircle />
              </QuestionIconContainer>
            }
            content={
              <div>
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
                  20% chance to get 4 initial sub-stats, and 80% to get 3.{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://genshin-impact.fandom.com/wiki/Loot_System/Artifact_Drop_Distribution#Initial_Sub_Stat_Number_Distribution"
                  >
                    Source
                  </Link>
                </Text>
                <Text>
                  Calculated chance to get the correct main stat and sub-stats;{" "}
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
                  Contact me at{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://www.reddit.com/message/compose/?to=grumd"
                  >
                    /u/grumd
                  </Link>{" "}
                  if you have any questions.
                </Text>
              </div>
            }
          />
        </Flex>
        <Text>Cumulative chance to get this artifact at least once:</Text>
        {chance > 0 && !_.isEmpty(chartData) && (
          <ResponsiveContainer width="100%" aspect={2.5}>
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, bottom: 5, left: -15 }}
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
    acceptBothSets: false,
    type: Types.Flower,
    subStats: [],
  });
  const [chance, setChance] = useState<number | null>(null);
  const [calculating, setCalculating] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartDataEntry[]>([]);

  const onChangeBothSets = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((form) => ({
      ...form,
      acceptBothSets: !!event.target.checked,
    }));
  };

  const onChangeType = (value: Types) => {
    setFormData((form) => ({
      acceptBothSets: form.acceptBothSets,
      type: value,
      subStats: [],
    })); // reset all
  };

  const onChangeMainStat = (value: MainStats) => {
    setFormData((form) => ({
      ...form,
      mainStat: value,
      subStats: [],
    })); // reset sub stats
  };

  const mainStatOptions = allowedMainStats[formData.type].map((mainStat) => ({
    label: mainStat,
    value: mainStat,
  }));

  const subStatList: SubStatFieldTypes[] = formData.mainStat
    ? [CRIT_VALUE, ...allowedSubStats[formData.mainStat]]
    : [];
  const subStatOptions = subStatList
    .filter((subStat) => {
      const alreadyUsingStat = formData.subStats.some(([s]) => s === subStat);
      const usingCritValue = formData.subStats.some(([s]) => s === CRIT_VALUE);
      const isCritStat = subStat === Stats.CR || subStat === Stats.CD;
      return !alreadyUsingStat && !(usingCritValue && isCritStat);
    })
    .map(mapSubStatOption);

  useEffect(() => {
    if (!formData.mainStat) {
      setFormData((form) => ({ ...form, mainStat: mainStatOptions[0].value }));
    }
  }, [formData.mainStat, mainStatOptions]);

  useEffect(() => {
    if (
      formData.subStats.some((sub) => sub[0] === CRIT_VALUE) &&
      formData.subStats.some(
        (sub) => sub[0] === Stats.CR || sub[0] === Stats.CD
      )
    ) {
      setFormData((form) => ({
        ...form,
        subStats: form.subStats.filter(
          (sub) => sub[0] !== Stats.CR && sub[0] !== Stats.CD
        ),
      }));
    }
  }, [formData.mainStat, formData.subStats, mainStatOptions]);

  const onAddSubStats = () => {
    if (subStatOptions.length) {
      setFormData((form) => ({
        ...form,
        subStats: [
          ...form.subStats,
          [
            subStatOptions.find((opt) => opt.value !== CRIT_VALUE)?.value ||
              subStatOptions[0].value,
            0,
            "0",
          ],
        ],
      }));
    }
  };

  const onChangeSubStat =
    (subStat: SubStatFieldTypes) => (value: SubStatFieldTypes) => {
      setFormData((form) => ({
        ...form,
        subStats: form.subStats.map((pair) =>
          pair[0] === subStat ? [value, 0, "0"] : pair
        ),
      }));
    };

  const onChangeSubStatNumber =
    (subStat: SubStatFieldTypes) => (stringValue: string, value: number) => {
      console.log(stringValue, value);
      setFormData((form) => ({
        ...form,
        subStats: form.subStats.map((pair) =>
          pair[0] === subStat ? [subStat, value || 0, stringValue || "0"] : pair
        ),
      }));
    };

  const onRemoveSubStat = (subStat: SubStatFieldTypes) => {
    setFormData((form) => ({
      ...form,
      subStats: form.subStats.filter((pair) => pair[0] !== subStat),
    }));
  };

  const onCalculate = async () => {
    if (formData.mainStat) {
      setCalculating(true);
      const subStats = formData.subStats.filter((sub) => sub[0] !== CRIT_VALUE);
      const critValue = formData.subStats.find((sub) => sub[0] === CRIT_VALUE);
      const chance = await workerInstance.calculateChance({
        acceptBothSets: formData.acceptBothSets,
        type: formData.type,
        mainStat: formData.mainStat,
        critValue: critValue ? critValue[1] : null,
        subStats: subStats.reduce((acc, [subStat, value]) => {
          return {
            ...acc,
            [subStat]: value,
          };
        }, {}),
      });
      setCalculating(false);

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
          <FormControl display="flex" alignItems="center">
            <FormLabel cursor="pointer" htmlFor="one-set" size="lg" mb={1}>
              Accept both artifact sets from a domain
            </FormLabel>
            <Switch
              id="one-set"
              onChange={onChangeBothSets}
              isChecked={formData.acceptBothSets}
            />
          </FormControl>
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
                const [subStat, , stringValue] = value;
                const options = _.compact([
                  mapSubStatOption(subStat),
                  ...(subStat === CRIT_VALUE
                    ? [mapSubStatOption(Stats.CR), mapSubStatOption(Stats.CD)]
                    : []),
                  ...subStatOptions,
                ]);
                return (
                  <HStack key={`substat-${index}`} width="100%">
                    <FormControl id={`substat-${index}-name`}>
                      <Select
                        value={subStat}
                        items={options}
                        onChange={onChangeSubStat(subStat)}
                      />
                    </FormControl>
                    <Text fontWeight="bold" fontSize="large">
                      {">="}
                    </Text>
                    <FormControl id={`substat-${index}-value`}>
                      <NumberInput
                        min={0}
                        defaultValue={0}
                        value={stringValue}
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
