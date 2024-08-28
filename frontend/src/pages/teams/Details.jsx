import React, { useCallback, useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import DomainIcon from '@mui/icons-material/Domain';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
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
import CreateTeam from './CreateTeam';
import useModal from '../../hooks/useModal';
import useLoader from '../../hooks/useLoader';
import MemberCard from './MemberCard';
import Loading from '../../components/Loading';

const Details = () => {
    const [team, setTeam] = useState(null);
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

    const fetchTeam = useCallback(async () => {
        try {
            const { data } = await axios.get(`/team/${id}`);
            setTeam(data.team);
        } catch (error) {
            setTeam({});
            errorHandler(error);
        }
    }, [errorHandler]);

    const deleteUser = useCallback(
        async id => {
            start();
            try {
                await axios.delete(`/team/${id}`);
                navigate('/teams');
            } catch (error) {
                errorHandler(error);
            } finally {
                end();
            }
        },
        [errorHandler, start, end]
    );

    useEffect(() => {
        fetchTeam();
    }, [fetchTeam]);

    return team ? (
        <Container>
            <Stack justifyContent='center' alignItems='center' height='100%'>
                <Card
                    elevation={0}
                    sx={{
                        maxWidth: 1300,
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        p: 5,
                    }}>
                    <Avatar
                        alt={team.name}
                        src={team.avatar}
                        sx={{
                            width: 110,
                            height: 110,
                            mb: 4,
                        }}
                    />

                    <Typography variant='h6' fontSize={28} fontWeight={600} mb={0.2}>
                        {team.name}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={600} color='text.secondary' mb={2}>
                        Created on : {new Date(team.createdAt).toDateString()}
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
                            {team.domain}
                        </Typography>
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />

                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' spacing={1} alignItems='flex-start'>
                            <Groups2OutlinedIcon sx={{ color: 'text.secondary' }} />

                            <Typography variant='subtitle1' color='text.secondary'>
                                Members
                            </Typography>
                        </Stack>

                        <Typography variant='subtitle1' color='text.secondary'>
                            {team.members?.length}
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
                            label={team.available ? 'Available' : 'Unavailable'}
                            sx={{
                                bgcolor: team.available ? '#dff4e1' : '#00000014',
                                color: team.available ? '#04a213' : 'text.primary',
                            }}
                        />
                    </Stack>
                    <Divider sx={{ my: 1.5 }} />
                    <Grid container spacing={2}>
                        {team.members?.map(member => (
                            <Grid item xs={12} sm={6} md={3} lg={2} key={member._id}>
                                <MemberCard member={member} />
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />

                    <Stack direction='row' justifyContent='flex-end' spacing={2} mt={2.5}>
                        <Button
                            variant='outlined'
                            color='warning'
                            size='small'
                            onClick={openDeleteModal}
                            startIcon={<DeleteIcon fontSize='small' />}>
                            Delete Team
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            size='small'
                            onClick={openModal}
                            startIcon={<EditIcon fontSize='small' />}>
                            Edit Team
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
                    <CreateTeam closeModal={closeModal} refresh={fetchTeam} teamId={team._id} />
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
                            Delete {team.team}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant='subtitle01'>
                            Do you really want to delete the {team.name} ?
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
                            onClick={() => deleteUser(team._id)}
                            disabled={loaderState}
                            endIcon={circular}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </Container>
    ) : (
        <Loading message='Please wait! while your team datails are loading...' />
    );
};

export default Details;
