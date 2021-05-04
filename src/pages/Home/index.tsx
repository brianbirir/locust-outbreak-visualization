import React, { useEffect, useState, useRef } from 'react';

import { Box, Grid, Spinner } from '@chakra-ui/react';

import { gridCoordinates } from '../../shared/grid';
import { coordinate, apiResponseData } from '../../shared/models/grid';
import FarmGrid from '../../shared/components/FarmGrid';
import UrlForm from '../../shared/components/UrlForm';

const HomePage: React.FC<{}> = () => {
    const [grids, setGrids] = useState<number>(0);
    const [singleGridHeight] = useState<number>();
    const [gridPoints, setGridPoints] = useState<coordinate[][]>();
    const [responseData, setResponseData] = useState<apiResponseData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const boxElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const points = gridCoordinates(
            responseData?.grid_width_and_length || 0
        );
        const numberOfColumns = points.length;
        setGrids(numberOfColumns);
        setGridPoints(points);
    }, [responseData]);

    const handleCallback = (data: apiResponseData) => {
        // console.log(data);
        console.log(isLoading);
        setResponseData(data);
    };

    const handleLoadingState = (state: boolean) => {
        setIsLoading(state);
    };

    // const handleSetRef = (ref: React.RefObject<HTMLDivElement>) => {
    //     if (ref !== null) {
    //         console.log(ref);
    //         // let box = ref.current;
    //         // console.log(ref.current?.offsetWidth);
    //         // setSingleGridHeight(box?.offsetWidth);
    //     }
    // };

    return (
        <>
            <Box bg="tomato" w="100%" p={4} color="white" ref={boxElementRef}>
                Locust Outbreak Visualization Simulator
            </Box>

            <UrlForm
                parentCallback={handleCallback}
                loadingState={handleLoadingState}
            />

            {isLoading ? (
                <Spinner />
            ) : (
                <Grid mt={5} templateColumns={`repeat(${grids}, 1fr)`} gap={1}>
                    {gridPoints?.map((rows) => {
                        return rows.map((cell, index) => {
                            return (
                                <FarmGrid
                                    key={index}
                                    dataY={cell.y}
                                    dataX={cell.x}
                                    id={`${cell.x},${cell.y}`}
                                >{`${cell.x} ${cell.y}`}</FarmGrid>
                            );
                        });
                    })}
                </Grid>
            )}
        </>
    );
};

export default HomePage;
