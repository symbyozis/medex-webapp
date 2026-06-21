import React from 'react';
import {Badge, Box, Button, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";

export interface ICheckup {
    image: string
    name: string
    price: number | null
    points: string[]
    link: string
}

export const Checkup: React.FC<ICheckup> = (props) => {
    return (
        <Paper
            elevation={3}
            sx={{
                textAlign: 'center',
                py: 10,
                borderRadius: 'var(--border-radius)',
                background: `url(${props.image}) no-repeat center / cover`,
                color: '#fff',
                position: 'relative',
                zIndex: 0,
                '&::after': {
                    content: '""',
                    backgroundImage: 'linear-gradient(rgba(131, 148, 165, 0.49), rgba(131, 148, 165, 0.49))',
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                }
            }}
        >
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontFamily: 'var(--main-font)'
                    }}
                >
                    {props.name}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography
                        variant="h2"
                        sx={{
                            py: 3,
                            fontFamily: 'var(--main-font)',
                            fontSize: props.price === null ? '1.25rem' : undefined,
                        }}
                    >
                        {props.price === null ? 'Уточняйте по телефону' : `${props.price} ₽`}
                    </Typography>
                    <List dense sx={{ mb: 3 }}>
                        {props.points.map(point => (
                            <ListItem key={point} sx={{
                                textAlign: 'center',
                                display: 'list-item',
                                listStyleType: 'disc',
                                listStylePosition: 'inside',
                                py: 0
                            }}>
                                <ListItemText primary={point} sx={{ display: 'inline-block'}} />
                            </ListItem>
                        ))}
                    </List>
                    <Button variant="contained">Выбрать</Button>
                </Box>
            </Box>
        </Paper>
    );
};
