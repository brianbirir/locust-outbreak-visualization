import React, { useRef, useState, useEffect } from 'react';
import { Box, BoxProps, Text, Center } from '@chakra-ui/react';

import { grid, impactLevel } from '../models/grid';

interface IProps extends BoxProps {
    data: grid;
}

const FarmGrid: React.FC<IProps> = (props) => {
    const [impactColor, setImpactColor] = useState('');
    const { data, ...rest } = props;
    const boxElementRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>();

    useEffect(() => {});

    useEffect(() => {
        if (data.impactLevel === impactLevel.High) {
            setImpactColor('#C53030');
        } else if (data.impactLevel === impactLevel.Medium) {
            setImpactColor('#F6E05E');
        } else if (data.impactLevel === impactLevel.Low) {
            setImpactColor('#FEEBC8');
        } else {
            setImpactColor('#F0FFF4');
        }
    }, [data.impactLevel]);

    useEffect(() => {
        let box = boxElementRef.current;
        let width = box?.offsetWidth;
        setHeight(width);
    }, []);

    return (
        <>
            <Box
                className="farm"
                color={'black'}
                w="100%"
                h={height}
                border="1px"
                borderColor="gray.200"
                bg={impactColor}
                data-y={data.y}
                data-x={data.x}
                ref={boxElementRef}
                {...rest}
            >
                <Center h={height} w="100%">
                    {data.infectedNeighbour && (
                        <Text fontSize="sm" fontWeight="bold">
                            {data.impactLevel} Loss
                        </Text>
                    )}
                    {data.sourceOfOutbreak && (
                        <Text fontSize="sm" fontWeight="bold">
                            {data.impactLevel} Loss
                        </Text>
                    )}
                </Center>
            </Box>
        </>
    );
};

export default FarmGrid;
