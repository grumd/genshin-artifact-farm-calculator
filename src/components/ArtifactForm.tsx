import { useState, useEffect, ChangeEvent } from "react";
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
  Switch,
} from "@chakra-ui/react";
import { MdAddCircle } from "react-icons/md";
import _ from "lodash/fp";

import { ResultsBox } from "./ResultsBox";
import { Select } from "./Select";
import type { ChartDataEntry } from "./ResultsBox";

import { allowedMainStats, allowedSubStats } from "../data/combinations";
import { MainStats, SubStats, Types } from "../data/enums";
import WorkerCalculateChance from "../utils/calculateChance.worker";
import type { CalculateResult } from "../utils/calculateChance.worker";

interface FormData {
  acceptBothSets: boolean;
  type: Types;
  mainStat?: MainStats;
  subStats: [SubStats, number, string][];
}

const workerInstance = WorkerCalculateChance();

const typeOptions: { value: Types; label: string }[] = _.values(Types).map(
  (type) => ({ label: type, value: type })
);

export function ArtifactForm() {
  const [formData, setFormData] = useState<FormData>({
    acceptBothSets: false,
    type: Types.Flower,
    subStats: [],
  });
  const [chances, setChances] = useState<Partial<CalculateResult>>({});
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
        subStats: [...form.subStats, [subStatOptions[0].value, 0, "0"]],
      }));
    }
  };

  const onChangeSubStat = (subStat: SubStats) => (value: SubStats) => {
    setFormData((form) => ({
      ...form,
      subStats: form.subStats.map((pair) =>
        pair[0] === subStat ? [value, 0, "0"] : pair
      ),
    }));
  };

  const onChangeSubStatNumber =
    (subStat: SubStats) => (stringValue: string, value: number) => {
      setFormData((form) => ({
        ...form,
        subStats: form.subStats.map((pair) =>
          pair[0] === subStat ? [subStat, value || 0, stringValue || "0"] : pair
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
      performance.mark("chance");
      const { chance, upgradeChance, chanceSubsMatch } =
        await workerInstance.calculateChance({
          acceptBothSets: formData.acceptBothSets,
          type: formData.type,
          mainStat: formData.mainStat,
          subStats: formData.subStats.reduce((acc, [subStat, value]) => {
            return {
              ...acc,
              [subStat]: value,
            };
          }, {}),
        });
      performance.measure("Time to calculate chances", "chance");
      setCalculating(false);
      performance.getEntriesByType("measure").forEach((perfMeasure) => {
        console.log(perfMeasure.name, perfMeasure.duration, "ms");
      });
      performance.clearMarks();
      performance.clearMeasures();

      const invertedChance = 1 - chance;
      const cumulativeChartData: { resin: number; chance: number }[] = [];
      let resinSpent = 0,
        cumulativeInvertedChance = 1;
      const step =
        chance > 0.01 ? 1 : chance > 0.005 ? 4 : chance > 0.001 ? 8 : 16;
      // 2920 is 365 days of 8 domain runs per day
      for (let i = 0; i < 2920; i++) {
        if (cumulativeInvertedChance < 0.05) {
          break;
        }
        resinSpent += 20;
        cumulativeInvertedChance *= invertedChance;
        if (!((i + 1) % step)) {
          cumulativeChartData.push({
            resin: resinSpent,
            chance: 1 - cumulativeInvertedChance,
          });
        }
      }
      setChartData(cumulativeChartData);
      setChances({ chance, upgradeChance, chanceSubsMatch });
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
            Calculate
          </Button>
        </VStack>
      </Box>
      {!_.isNil(chances.chance) && (
        <ResultsBox
          chances={chances as CalculateResult}
          chartData={chartData}
        />
      )}
    </Flex>
  );
}
