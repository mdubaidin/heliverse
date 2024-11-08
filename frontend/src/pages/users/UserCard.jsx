import { Avatar, Button, Card, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = props => {
    const { _id, firstName, lastName, email, gender, domain, avatar, available } = props.user;
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/users/${_id}`)}
            elevation={0}
            sx={{
                borderRadius: 2,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                p: 5,
                cursor: 'pointer',
            }}>
            <Stack direction='row' justifyContent='space-between' mb={2}>
                <Avatar
                    alt={firstName}
                    src={avatar}
                    sx={{
                        width: 70,
                        height: 70,
                        bgcolor: '#dedcd4',
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                />

                <Chip
                    size='small'
                    label={available ? 'Available' : 'Unavailable'}
                    sx={{
                        bgcolor: available ? '#dff4e1' : '#00000014',
                        color: available ? '#04a213' : 'text.primary',
                    }}
                />
            </Stack>
            <Typography
                variant='h6'
                fontSize={18}
                fontWeight={600}
                mb={0.2}
                sx={{
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '1',
                }}>
                {firstName + ' ' + lastName}
            </Typography>
            <Typography variant='body2' fontWeight={600} color='text.secondary' mb={2}>
                {email}
            </Typography>

            <Typography variant='body1' fontSize={15} fontWeight={600}>
                {domain} at @company
            </Typography>
            <Typography variant='body1' fontSize={15} fontWeight={600}>
                {gender}
            </Typography>
        </Card>
    );
};

export default UserCard;
