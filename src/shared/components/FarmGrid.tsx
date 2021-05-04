import React, { useRef, useState, useEffect } from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

interface IProps extends BoxProps {
    dataY?: number;
    dataX?: number;
}

// const FarmGrid = React.forwardRef((props: IProps, ref) => {
//     const { dataX, dataY, ...rest } = props;
//     // const boxElementRef = useRef<HTMLDivElement>(null);
//     // const [height, setHeight] = useState<number>();

//     // useEffect(() => {
//     //     let box = boxElementRef.current;
//     //     let width = box?.offsetWidth;
//     //     setHeight(width);
//     // }, []);

//     return (
//         <>
//             <Box
//                 className="farm"
//                 w="100%"
//                 border="1px"
//                 borderColor="gray.200"
//                 data-y={dataY}
//                 data-x={dataX}
//                 forwardedRef={ref}
//                 {...rest}
//             >
//                 {props.children}
//             </Box>
//         </>
//     );
// });

const FarmGrid: React.FC<IProps> = (props) => {
    const { dataX, dataY, ...rest } = props;
    const boxElementRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>();

    useEffect(() => {
        let box = boxElementRef.current;
        let width = box?.offsetWidth;
        setHeight(width);
    }, []);

    return (
        <>
            <Box
                className="farm"
                w="100%"
                h={height}
                border="1px"
                borderColor="gray.200"
                bg="#F0FFF4"
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
