import { Avatar, Card, Stack, Typography } from '@mui/material';
import React from 'react';

const MemberCard = props => {
    const { firstName, lastName, avatar, email } = props.member;
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 3,
                boxShadow:
                    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                p: 2,
            }}>
            <Stack justifyContent='center' alignItems={'center'}>
                <Avatar
                    alt={firstName}
                    src={avatar}
                    sx={{
                        width: 70,
                        height: 70,
                        bgcolor: '#dedcd4',
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 2,
                    }}
                />

                <Typography
                    variant='h6'
                    fontSize={16}
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
                <Typography variant='body2' fontWeight={500} color='text.secondary' mb={2}>
                    {email}
                </Typography>
            </Stack>
        </Card>
    );
};

export default MemberCard;
