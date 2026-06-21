import React from 'react';
import Slider from "react-slick";

import { Typography, Button, Box, Grid } from "@mui/material";

type TSlide = {
    image: string
    title: string
    text: string
    link: string
}

export const CarouselMain: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendDots: (dots: React.ReactNode) => (
            <Box sx={{
                position: 'absolute',
                bottom: { xs: '250px', md: 'auto' },
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <ul style={{ margin: 0, padding: 0 }}>{dots}</ul>
            </Box>
        ),
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

    const slides: TSlide[] = [
        {
            image: 'https://placehold.co/900', // TODO: фото клиники / главный баннер
            title: '26 лет на страже вашего здоровья',
            text: 'Многопрофильная клиника «Здоровье+» в Назрани — терапия, гинекология, урология и диагностика под одной крышей.',
            link: 'contacts',
        },
        {
            image: 'https://placehold.co/900', // TODO: фото врачей
            title: 'Внимательные врачи. Точная диагностика.',
            text: 'Лабораторные анализы и УЗИ-исследования прямо в клинике — без лишних поездок и очередей.',
            link: 'services',
        },
        {
            image: 'https://placehold.co/900', // TODO: фото кабинета / приёма
            title: 'Принимаем ежедневно, кроме воскресенья',
            text: 'Пн–Пт с 9:00 до 15:00, в субботу с 9:00 до 13:00. Запишитесь по телефону или через форму на сайте.',
            link: 'contacts',
        }
    ]
    return (
        <Box sx={{
            position: 'relative',
            pb: { xs: '60px', md: 0 },
            '& .slick-prev': { left: '-35px' },
            '& .slick-next': { right: '-35px' },
        }}>
            <Slider {...settings}>
                {slides.map(slide => (
                    <Box key={slide.title}>
                        <Grid container alignItems="center" spacing={3}>
                            <Grid size={{ xs: 12, md: 4 }} sx={{ order: { xs: 2, md: 1 } }}>
                                <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '3rem' } }}>
                                    {slide.title}
                                </Typography>
                                <Typography sx={{ my: { xs: 2, md: 3 } }}>{slide.text}</Typography>
                                <Button variant="contained" href={slide.link}>Записаться на приём</Button>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }} sx={{ order: { xs: 1, md: 2 }, mb: { xs: 2, md: 0 }, pb: { xs: '50px', md: 0 } }}>
                                <figure
                                    className="w-full bg-no-repeat bg-cover bg-center rounded-[20px]"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                        height: 'clamp(500px, 76vh, 76vh)',
                                        minHeight: '300px'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

