import React, { useCallback, useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import DomainIcon from '@mui/icons-material/Domain';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WcIcon from '@mui/icons-material/Wc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Divider,
    Grid,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import Container from '../../layouts/Container';
import { useNavigate, useParams } from 'react-router-dom';
import CreateUser from './CreateUser';
import useModal from '../../hooks/useModal';
import useLoader from '../../hooks/useLoader';
import { isEmpty } from '../../utils/utils';
import Loading from '../../components/Loading';

const Details = () => {
    const [user, setUser] = useState(null);
    const errorHandler = useErrorHandler();
    const { id } = useParams();
    const { modalState, openModal, closeModal } = useModal();
    const {
        modalState: deleteState,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
    } = useModal();
    const { start, end, loaderState, circular } = useLoader();
    const navigate = useNavigate();

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get(`/users/${id}`);
            setUser(data.user);
        } catch (error) {
            setUser({});
            errorHandler(error);
        }
    }, [errorHandler]);

    const deleteUser = useCallback(
        async id => {
            start();
            try {
                await axios.delete(`/users/${id}`);
                navigate('/users');
            } catch (error) {
                errorHandler(error);
            } finally {
                end();
            }
        },
        [errorHandler, start, end]
    );

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return user ? (
        <Container>
            <Stack justifyContent='center' alignItems='center' height='100%'>
                <Card
                    elevation={0}
                    sx={{
                        maxWidth: 800,
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        p: 5,
                    }}>
                    <Avatar
                        alt={user.firstName}
                        src={user.avatar}
                        sx={{
                            width: 110,
                            height: 110,
                            bgcolor: '#dedcd4',
                            border: '1px solid',
                            borderColor: 'divider',
                            mb: 4,
                        }}
                    />

                    <Typography variant='h6' fontSize={28} fontWeight={600} mb={0.2}>
                        {user.firstName + ' ' + user.lastName}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={600} color='text.secondary' mb={2}>
                        {user.email}
                    </Typography>

                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        mt={5}>
                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                            <WorkIcon sx={{ color: 'text.secondary' }} />

                            <Typography variant='subtitle1' color='text.secondary'>
                                Company
                            </Typography>
                        </Stack>

                        <Typography variant='subtitle1' color='text.secondary'>
                            ABC Company
                        </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />

                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                            <DomainIcon sx={{ color: 'text.secondary' }} />

                            <Typography variant='subtitle1' color='text.secondary'>
                                Domain
                            </Typography>
                        </Stack>

                        <Typography variant='subtitle1' color='text.secondary'>
                            {user.domain}
                        </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />

                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                            <WcIcon sx={{ color: 'text.secondary' }} />

                            <Typography variant='subtitle1' color='text.secondary'>
                                Gender
                            </Typography>
                        </Stack>

                        <Typography variant='subtitle1' color='text.secondary'>
                            {user.gender}
                        </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                            <AccessTimeFilledIcon sx={{ color: 'text.secondary' }} />

                            <Typography variant='subtitle1' color='text.secondary'>
                                Availability
                            </Typography>
                        </Stack>

                        <Chip
                            size='small'
                            label={user.available ? 'Available' : 'Unavailable'}
                            sx={{
                                bgcolor: user.available ? '#dff4e1' : '#00000014',
                                color: user.available ? '#04a213' : 'text.primary',
                            }}
                        />
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />

                    <Stack direction='row' justifyContent='flex-end' spacing={2} mt={2.5}>
                        <Button
                            variant='outlined'
                            color='warning'
                            size='small'
                            onClick={openDeleteModal}
                            startIcon={<DeleteIcon fontSize='small' />}>
                            Delete Profile
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            onClick={openModal}
                            startIcon={<EditIcon fontSize='small' />}>
                            Edit Profile
                        </Button>
                    </Stack>
                </Card>
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
                    <CreateUser closeModal={closeModal} refresh={fetchUser} userId={user._id} />
                </>
            </Modal>

            <Modal
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                open={deleteState}
                onClose={closeDeleteModal}>
                <Card sx={{ maxWidth: '548px', width: '100%' }}>
                    <CardContent>
                        <Typography variant='h5' fontWeight={500}>
                            Delete {user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant='subtitle01'>
                            Do you really want to delete the {user.firstName + ' ' + user.lastName}{' '}
                            ?
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ mt: 3, justifyContent: 'flex-end', p: 2 }}>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            sx={{ px: 2.5 }}
                            onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='warning'
                            size='small'
                            sx={{ px: 2.5 }}
                            onClick={() => deleteUser(user._id)}
                            disabled={loaderState}
                            endIcon={circular}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </Container>
    ) : (
        <Loading message='Please wait! while the user profile loading...' />
    );
};

export default Details;
