import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    InputGroup,
    InputLeftAddon,
    Button,
    Box,
} from '@chakra-ui/react';

interface IUrlFormProps {
    parentCallback(data: any): void;
    loadingState(state: boolean): void;
}
const UrlForm: React.FC<IUrlFormProps> = (props) => {
    const [form, setFormState] = useState({
        url: '',
    });

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setFormState({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handlePaste = (event: any) => {
        event.preventDefault();
        const pastedValue = event.clipboardData.getData('text');
        setFormState({
            ...form,
            [event.target.name]: pastedValue,
        });
    };

    const onSubmit = async (event: any) => {
        event.preventDefault();
        console.log('I got clicked');
        props.loadingState(true);
        await axios
            .get(form.url)
            .then((response: AxiosResponse) => {
                props.parentCallback(response.data);
                props.loadingState(false);
            })
            .catch((error: AxiosError) => console.error(error.response?.data));
    };

    const handleReset = () => {
        setFormState({ url: '' });
        props.parentCallback('');
    };

    return (
        <Box w="100%" p={4}>
            <form onSubmit={onSubmit}>
                <FormControl id="email">
                    <FormLabel>Data Source URL</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children="https://" />
                        <Input
                            id="url"
                            name="url"
                            type="text"
                            value={form.url}
                            onChange={onChange}
                            onPaste={handlePaste}
                        />
                    </InputGroup>
                    <FormHelperText>
                        Input URL to fetch farm data e.g.
                        https://run.mocky.io/v3/efc06fd8-cef1-4da6-b77f-9c03d3bb0eae
                    </FormHelperText>
                    <Button marginX={2} mt={4} colorScheme="teal" type="submit">
                        Run
                    </Button>
                    <Button
                        marginX={2}
                        mt={4}
                        colorScheme="teal"
                        variant="outline"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default UrlForm;
