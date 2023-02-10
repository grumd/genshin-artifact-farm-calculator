import { memo } from "react";
import styled from "styled-components";
import { Text, Box, Flex, Link } from "@chakra-ui/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaRegQuestionCircle } from "react-icons/fa";
import _ from "lodash/fp";

import { Popup } from "./Popup";

import type { CalculateResult } from "../utils/calculateChance.worker";
import { getMeaningfulPercents } from "../utils/formatNumber";

export interface ChartDataEntry {
  resin: number;
  chance: number;
}

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

export const ResultsBox = memo(
  ({
    chances,
    chartData,
  }: {
    chances: CalculateResult;
    chartData: ChartDataEntry[];
  }) => {
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
        {_.isNumber(chances.chanceSubsMatch) && (
          <Flex alignItems="center" flexFlow="row nowrap">
            <Text>Chance of getting an artifact with these stats:</Text>
            <Text
              paddingLeft={2}
              paddingRight={2}
              fontSize="120%"
              fontWeight="bold"
            >
              {getMeaningfulPercents(chances.chanceSubsMatch)}
            </Text>
          </Flex>
        )}
        {_.isNumber(chances.upgradeChance) && (
          <Flex alignItems="center" flexFlow="row nowrap">
            <Text>Chance of upgrading to desired numbers:</Text>
            <Text
              paddingLeft={2}
              paddingRight={2}
              fontSize="120%"
              fontWeight="bold"
            >
              {getMeaningfulPercents(chances.upgradeChance)}
            </Text>
          </Flex>
        )}
        <Flex alignItems="center" flexFlow="row nowrap">
          <Text>Total chance in one run (20 resin):</Text>
          <Text
            paddingLeft={2}
            paddingRight={2}
            fontSize="120%"
            fontWeight="bold"
          >
            {getMeaningfulPercents(chances.chance)}
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
                <Text>
                  7% chance of getting two 5* artifacts per run;{" "}
                  <Link
                    color="teal"
                    isExternal
                    href="https://docs.google.com/spreadsheets/d/1RcuniapqS6nOP05OCH0ui10Vo3bWu0AvFbhgcHzTybY/edit"
                  >
                    Source
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
        {chances.chance > 0 && !_.isEmpty(chartData) && (
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
