import axios from 'axios';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getBase64, isEmpty } from '../../utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import useLoader from '../../hooks/useLoader';
import useErrorHandler from '../../hooks/useErrorHandler';
import { useMessage } from '../../providers/Provider';
import Form from '../../components/Form';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Loading from '../../components/Loading';

const defaultValues = {
    avatar: '',
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    domain: '',
    available: '',
};

const Domains = [
    'Business Development',
    'Finance',
    'IT',
    'Management',
    'Marketing',
    'Sales',
    'UI Designing',
];

const CreateUser = props => {
    const { closeModal, refresh, userId } = props;
    const { start, end, loaderState } = useLoader();
    const errorHandler = useErrorHandler();
    const { showSuccess, showError } = useMessage();
    const [avatar, setAvatar] = useState(null);
    const fileRef = useRef();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: userId ? async () => await fetchUser(userId) : defaultValues,
    });

    const onSubmit = async data => {
        if (avatar) {
            data.avatar = avatar;
        }

        try {
            userId ? await axios.put(`/users/${userId}`, data) : axios.post('/users', data);

            refresh();
            showSuccess(userId ? 'User profile updated' : 'User created successfully');
            closeModal();
        } catch (err) {
            errorHandler(err);
        }
    };

    const fetchUser = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/users/${id}`);
                setAvatar(response.data.user.avatar);
                return response.data.user;
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, start, end]
    );

    console.log(errors);

    const fileHandler = async e => {
        e.stopPropagation();

        const file = e.target.files[0];
        if (!file) return showError('No file selected');
        const base64 = await getBase64(file);
        setAvatar(base64);
    };

    return loaderState ? (
        <Loading message='Please wait, while your Profile is loading...' textColor='white' />
    ) : (
        <Card
            sx={{
                boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px',
                borderRadius: '8px',
                maxWidth: '700px',
                width: '100%',
                p: 4,
                mx: 2,
                overflowX: 'hidden',
                maxHeight: '85vh',
                overflowY: 'auto',
            }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' mb={3}>
                <Typography variant='h5' fontWeight={500}>
                    {userId ? 'Edit' : 'Create'} User
                </Typography>

                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </Stack>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid container mb={2} spacing={5}>
                    <Grid item xs={12} md='auto' textAlign='center'>
                        <Avatar
                            alt='avatar'
                            src={avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: '#dedcd4',
                                border: '1px solid',
                                borderColor: 'divider',
                                mx: 'auto',
                                mb: 1.5,
                            }}
                        />
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            onClick={() => fileRef.current?.click()}
                            startIcon={<PhotoCameraOutlinedIcon fontSize='small' />}
                            sx={{ px: 2.5 }}>
                            Upload Photo
                        </Button>
                    </Grid>

                    <Grid item xs={12} md>
                        <Input
                            label='First name'
                            fieldName='firstName'
                            register={register}
                            registerOptions={{
                                required: 'First name is required',
                                minLength: {
                                    value: 3,
                                    message: 'First name must be at least 3 characters',
                                },
                            }}
                        />

                        <Input label='Last name' fieldName='lastName' register={register} />
                        <Controller
                            control={control}
                            name='gender'
                            render={({ field }) => (
                                <Select
                                    label='Gender'
                                    {...field}
                                    {...register('gender', { required: 'Gender is required' })}>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>

                <Input
                    label='Email Address'
                    fieldName='email'
                    register={register}
                    registerOptions={{
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Email address must be valid',
                        },
                    }}
                />

                <Controller
                    control={control}
                    name='domain'
                    render={({ field }) => (
                        <Select
                            label='Domain'
                            {...field}
                            {...register('domain', { required: 'Domain is required' })}>
                            {Domains.map(domain => (
                                <MenuItem key={domain} value={domain}>
                                    {domain}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />

                <Controller
                    control={control}
                    name='available'
                    render={({ field }) => (
                        <Select
                            label='Availability'
                            {...field}
                            {...register('available', { required: 'Availability is required' })}>
                            <MenuItem value={'true'}>Available</MenuItem>
                            <MenuItem value={'false'}>Unavailable</MenuItem>
                        </Select>
                    )}
                />

                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='body2' color='red'>
                        {isEmpty(errors) ? null : Object.values(errors)[0]?.message}
                    </Typography>

                    <input
                        type='file'
                        ref={fileRef}
                        style={{ display: 'none' }}
                        onChange={fileHandler}
                        onClick={() => {
                            fileRef.current.value = '';
                        }}
                        accept='image/x-png,image/gif,image/jpeg'
                    />

                    <Button
                        type='submit'
                        variant='contained'
                        size='small'
                        sx={{ px: 2.5 }}
                        disabled={isSubmitting}
                        endIcon={isSubmitting && <CircularProgress color='inherit' size='small' />}>
                        {userId ? 'Done' : 'Create'}
                    </Button>
                </Stack>
            </Form>
        </Card>
    );
};

export default CreateUser;
