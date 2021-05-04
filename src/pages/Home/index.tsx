import React, { useEffect, useState, useRef } from 'react';

import {
    Box,
    Grid,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Flex,
} from '@chakra-ui/react';

import { gridCoordinates } from '../../shared/gridGenerator';
import { apiResponseData, grid } from '../../shared/models/grid';
import FarmGrid from '../../shared/components/FarmGrid';
import UrlForm from '../../shared/components/UrlForm';

const HomePage: React.FC<{}> = () => {
    const [grids, setGrids] = useState<number>(0);
    const [gridPoints, setGridPoints] = useState<grid[][]>();
    const [overallImpact, setOverallImpact] = useState<number>();
    const [responseData, setResponseData] = useState<apiResponseData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const boxElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const points = gridCoordinates(responseData);
        const numberOfColumns = points.length;
        setGrids(numberOfColumns);
        setGridPoints(points);
        setOverallImpact(getOverallImpact(points));
    }, [responseData]);

    const handleCallback = (data: apiResponseData) => {
        setResponseData(data);
    };

    const handleLoadingState = (state: boolean) => {
        setIsLoading(state);
    };

    const getOverallImpact = (points: grid[][]) => {
        const impactStore: number[] = [];
        points?.forEach((point) =>
            point.forEach((item) =>
                impactStore.push(parseInt(item.impactLevel))
            )
        );

        const totalImpact: number = impactStore
            .filter((impact) => {
                return impact > 0;
            })
            .reduce((sum, impact) => {
                return sum + impact;
            }, 0);

        return totalImpact / Math.pow(points.length, 2);
    };

    return (
        <>
            <Box bg="tomato" w="100%" p={4} color="white" ref={boxElementRef}>
                Locust Outbreak Visualization Simulator
            </Box>

            <UrlForm
                parentCallback={handleCallback}
                loadingState={handleLoadingState}
            />

            {isLoading && !gridPoints ? (
                <Spinner />
            ) : (
                <>
                    <Flex justify="flex-end">
                        <Box w="25%">
                            <Stat>
                                <StatLabel>Overall Impact</StatLabel>
                                <StatNumber>
                                    {overallImpact ? overallImpact : 0} %
                                </StatNumber>
                            </Stat>
                        </Box>
                    </Flex>

                    <Grid
                        mt={5}
                        templateColumns={`repeat(${grids}, 1fr)`}
                        gap={0}
                    >
                        {gridPoints?.map((rows) => {
                            return rows.map((cell, index) => {
                                return (
                                    <FarmGrid
                                        key={index}
                                        data={cell}
                                        id={`${cell.x}-${cell.y}`}
                                    >{`${cell.x} ${cell.y}`}</FarmGrid>
                                );
                            });
                        })}
                    </Grid>
                </>
            )}
        </>
    );
};

export default HomePage;
