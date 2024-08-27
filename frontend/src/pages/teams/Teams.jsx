import React, { useCallback, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Search from '../../components/Search';
import { Box, Button, Grid, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import useErrorHandler from '../../hooks/useErrorHandler';
import axios from 'axios';
import Container from '../../layouts/Container';
import TeamCard from './TeamCard';
import CreateTeam from './CreateTeam';
import useModal from '../../hooks/useModal';
import Loading from '../../components/Loading';

const Users = () => {
    const [teams, setTeams] = useState(null);
    const errorHandler = useErrorHandler();
    const { modalState, openModal, closeModal } = useModal();

    const fetchTeams = useCallback(async () => {
        try {
            const { data } = await axios.get('/team');
            setTeams(data.teams);
        } catch (error) {
            setTeams([]);
            errorHandler(error);
        }
    }, [errorHandler]);

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    return teams ? (
        <Container>
            <Stack
                direction='row'
                spacing={4}
                justifyContent='space-between'
                alignItems='center'
                mb={4}>
                <Typography variant='h4' fontWeight={500}>
                    Teams
                </Typography>

                <Button
                    variant='contained'
                    size='small'
                    startIcon={<AddIcon />}
                    sx={{ px: 2.5 }}
                    onClick={() => {
                        openModal();
                    }}>
                    Create team
                </Button>
            </Stack>

            <Grid container spacing={2}>
                {teams.map(team => (
                    <Grid item xs={12} md={6} lg={4} xl={3} key={team._id}>
                        <TeamCard team={team} />
                    </Grid>
                ))}
            </Grid>

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
                    <CreateTeam closeModal={closeModal} refresh={fetchTeams} />
                </>
            </Modal>
        </Container>
    ) : (
        <Loading message='Please wait! while the teams are loading...' />
    );
};

export default Users;
