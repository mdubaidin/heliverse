import axios from 'axios';
import React, { useCallback, useState, useRef, useEffect } from 'react';
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
    Chip,
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
import { useDebouncedCallback } from '@mantine/hooks';
import SelectWithSearch from '../../components/SelectWithSearch';

const defaultValues = {
    avatar: '',
    name: '',
    domain: '',
    available: '',
    members: [],
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

const CreateTeam = props => {
    const { closeModal, refresh, teamId } = props;
    const { start, end, loaderState } = useLoader();
    const errorHandler = useErrorHandler();
    const { showSuccess, showError } = useMessage();
    const [avatar, setAvatar] = useState(null);
    const [users, setUsers] = useState({ search: {}, cache: {}, selected: [] });
    const fileRef = useRef();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: teamId ? async () => await fetchTeam(teamId) : defaultValues,
    });

    const watchFields = watch();

    const onSubmit = async data => {
        if (avatar) {
            data.avatar = avatar;
        }

        try {
            teamId ? await axios.put(`/team/${teamId}`, data) : await axios.post('/team', data);

            refresh();
            closeModal();
            showSuccess(teamId ? 'Team updated' : 'Team created');
        } catch (err) {
            errorHandler(err);
        }
    };

    const fetchTeam = useCallback(
        async id => {
            start();
            try {
                const response = await axios.get(`/team/${id}`);
                const { team } = response.data;
                setAvatar(team.avatar);
                team.available = String(team.available);

                const format = {
                    cache: {},
                    selected: [],
                };

                team.members?.forEach(user => {
                    format.cache[user._id] = user.firstName + ' ' + user.lastName;
                    format.selected.push(user._id);
                });

                team.members = format.selected;
                setUsers({ ...format, search: format.cache });

                return team;
            } catch (e) {
                errorHandler(e);
            } finally {
                end();
            }
        },
        [errorHandler, start, end]
    );

    const multipleChangeHandler = e => {
        const { name, value } = e.target;
        const multiple = typeof value === 'string' ? value.split(',') : value;
        setValue(name, multiple);
        const selected = getValues('members');
        setUsers(prev => ({ ...prev, selected }));
    };

    const fileHandler = async e => {
        e.stopPropagation();

        const file = e.target.files[0];
        if (!file) return showError('No file selected');
        const base64 = await getBase64(file);
        setAvatar(base64);
    };

    const fetchUsers = useDebouncedCallback(async search => {
        try {
            const { domain, available } = watchFields;
            const params = {
                search,
                searchBy: 'firstName',
                domain,
                available,
                pageSize: 5,
            };

            const response = await axios.get(`/users`, { params });
            const users = response.data.users;

            setUsers(prev => ({ ...prev, search: {} }));

            const format = {};

            users.forEach(user => (format[user._id] = user.firstName + ' ' + user.lastName));

            setUsers(prev => ({ ...prev, search: format, cache: { ...prev.cache, ...format } }));
        } catch (e) {
            errorHandler(e);
        }
    }, 500);

    return loaderState ? (
        <Loading message='Please wait, while your Team is loading...' textColor='white' />
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
                    {teamId ? 'Edit' : 'Create'} Team
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
                            label='Team name'
                            fieldName='name'
                            register={register}
                            registerOptions={{
                                required: 'Team name is required',
                                minLength: {
                                    value: 3,
                                    message: 'Team name must be at least 3 characters',
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
                                    {...register('available', {
                                        required: 'Avaliability is required',
                                    })}>
                                    <MenuItem value='true'>Available</MenuItem>
                                    <MenuItem value='false'>Unavailable</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>

                <Typography variant='h5'>Add Member</Typography>
                <SelectWithSearch
                    {...register('members', { required: 'Members is required' })}
                    displayEmpty
                    name='members'
                    onChange={multipleChangeHandler}
                    value={users.selected}
                    disabled={!(watchFields.domain && watchFields.available)}
                    isError={!!errors.members}
                    error={errors.members?.message}
                    multiple
                    renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map(id => {
                                return (
                                    <Chip
                                        key={id}
                                        label={users.cache[id]}
                                        size='small'
                                        variant='outlined'
                                        color='primary'
                                    />
                                );
                            })}
                        </Box>
                    )}
                    fullWidth
                    SearchProps={{
                        onChange: e => {
                            if (e.target.value.trim()) return fetchUsers(e.target.value);
                            setUsers(prev => ({ ...prev, search: {} }));
                        },
                    }}>
                    {isEmpty(users.search) ? (
                        <Typography variant='subtitle2' color='text.secondary' textAlign='center'>
                            No search results
                        </Typography>
                    ) : (
                        Object.keys(users.search).map(id => (
                            <MenuItem value={id} key={id} sx={{ px: 1.2 }}>
                                {users.search[id]}
                            </MenuItem>
                        ))
                    )}
                </SelectWithSearch>

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
                        {teamId ? 'Done' : 'Create'}
                    </Button>
                </Stack>
            </Form>
        </Card>
    );
};

export default CreateTeam;
