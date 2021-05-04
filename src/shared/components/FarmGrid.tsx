import React, { useRef, useState, useEffect } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

interface IProps extends BoxProps {
    dataY?: number;
    dataX?: number;
    sourceOfOutbreak?: boolean;
    isInfectedNeighbour?: boolean;
}

const FarmGrid: React.FC<IProps> = (props) => {
    const {
        dataX,
        dataY,
        sourceOfOutbreak,
        isInfectedNeighbour,
        ...rest
    } = props;
    const boxElementRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>();

    const impactColor = () => {
        if (sourceOfOutbreak) {
            return '#C53030';
        } else if (isInfectedNeighbour) {
            return '#F6E05E';
        } else {
            return '#F0FFF4';
        }
    };

    useEffect(() => {
        let box = boxElementRef.current;
        let width = box?.offsetWidth;
        setHeight(width);
    }, []);

    return (
        <>
            <Box
                className="farm"
                color={sourceOfOutbreak ? 'white' : 'black'}
                w="100%"
                h={height}
                border="1px"
                borderColor="gray.200"
                bg={impactColor()}
                data-y={dataY}
                data-x={dataX}
                ref={boxElementRef}
                {...rest}
            >
                {props.children}
            </Box>
        </>
    );
};

export default FarmGrid;
