import React, { useCallback, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Search from '../../components/Search';
import {
    Button,
    Grid,
    MenuItem,
    Modal,
    Pagination,
    Select,
    Stack,
    Typography,
} from '@mui/material';
import UserCard from './UserCard';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import Container from '../../layouts/Container';
import { useDebouncedValue } from '@mantine/hooks';
import useModal from '../../hooks/useModal';
import CreateUser from './CreateUser';
import { filterQuery } from '../../utils/utils';
import Loading from '../../components/Loading';
import { Domains, Gender } from '../../constants/filters';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [filter, setFilter] = useState({ domain: '', gender: '', available: '' });
    const [search, setSearch] = useState('');
    const [page, setPage] = useState({ count: 0, value: 1 });
    const searchValue = useDebouncedValue(search, 500)[0];
    const errorHandler = useErrorHandler();
    const { modalState, openModal, closeModal } = useModal();

    const onSelectHandler = e => {
        const { name, value } = e.target;

        setFilter(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchUsers = useCallback(async () => {
        let available = '';
        if (filter.available === 'Available') available = true;
        if (filter.available === 'Unavailable') available = false;

        try {
            const search = searchValue ? { search: searchValue, searchBy: 'firstName' } : null;
            const query = { ...search, ...filter, available, page: page.value };

            const params = filterQuery(query);

            const response = await axios.get(`/users`, { params });

            const { users, pageData } = response.data;

            setUsers(users);
            setPage({ count: pageData.totalPages, value: pageData.currentPage });
        } catch (error) {
            setUsers([]);
            errorHandler(error);
        }
    }, [errorHandler, searchValue, filter, page.value]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return users ? (
        <Container>
            <Stack
                direction='row'
                spacing={4}
                justifyContent='space-between'
                alignItems='center'
                mb={4}>
                <Typography variant='h4' fontWeight={500}>
                    Users
                </Typography>

                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    sx={{ px: 2.5 }}
                    onClick={() => {
                        openModal();
                    }}>
                    Create user
                </Button>
            </Stack>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                justifyContent='space-between'
                alignItems='center'
                mb={4}>
                <Stack direction='row' spacing={2}>
                    <Select
                        name='domain'
                        size='small'
                        displayEmpty
                        value={filter.domain}
                        onChange={onSelectHandler}
                        renderValue={v => (v ? v : 'Domains')}>
                        <MenuItem value=''>All Domains</MenuItem>
                        {Domains.map(domain => (
                            <MenuItem key={domain} value={domain}>
                                {domain}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        name='gender'
                        size='small'
                        displayEmpty
                        value={filter.gender}
                        onChange={onSelectHandler}
                        renderValue={v => (v ? v : 'Gender')}>
                        <MenuItem value=''>All</MenuItem>
                        {Gender.map(gen => (
                            <MenuItem key={gen} value={gen}>
                                {gen}
                            </MenuItem>
                        ))}
                    </Select>

                    <Select
                        name='available'
                        size='small'
                        displayEmpty
                        value={filter.available}
                        onChange={onSelectHandler}
                        sx={{ minHeight: '36px' }}
                        renderValue={v => (v ? v : 'Availability')}>
                        <MenuItem value=''>All</MenuItem>
                        <MenuItem value='Available'>Available</MenuItem>
                        <MenuItem value='Unavailable'>Unavailable</MenuItem>
                    </Select>
                </Stack>

                <Search
                    placeholder='Search Users'
                    value={search}
                    onChange={e => {
                        const value = e.target.value;
                        setSearch(value);
                    }}
                />
            </Stack>

            <Grid container spacing={2}>
                {users.map(user => (
                    <Grid item xs={12} md={6} lg={4} xl={3} key={user._id}>
                        <UserCard user={user} />
                    </Grid>
                ))}
            </Grid>

            <Stack direction='row' justifyContent='center' alignItems='center' my={5}>
                <Pagination
                    count={page.count}
                    variant='outlined'
                    color='primary'
                    siblingCount={2}
                    onChange={(_, value) => setPage(prev => ({ ...prev, value }))}
                />
            </Stack>

            <Modal
                sx={{
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={modalState}
                onClose={closeModal}>
                <>
                    <CreateUser closeModal={closeModal} refresh={fetchUsers} />
                </>
            </Modal>
        </Container>
    ) : (
        <Loading message='Please wait! while the users are loading...' />
    );
};

export default Users;
