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
                        Input URL to fetch farm data
                    </FormHelperText>
                    <Button mt={4} colorScheme="teal" type="submit">
                        Run
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
};

export default UrlForm;
