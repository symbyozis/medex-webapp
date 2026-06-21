import React from 'react';
import Slider from "react-slick";

import Doctor, { IDoctor } from "../../Cards/Doctor";

export const CarouselDoctors: React.FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        speed: 400,
        autoplay: false,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true
                }
            }
        ],
    };

    const slides: IDoctor[] = [
        {
            id: 1,
            image: 'https://placehold.co/900', // TODO: фото врача
            name: 'Муйез Хадиджа',
            description: 'Ведёт приём по терапии и гинекологии. Многолетний опыт работы в клинике «Здоровье+» — внимательный подход к каждому пациенту.',
            link: 'doctors',
            position: 'Терапевт, Гинеколог',
        },
        {
            id: 2,
            image: 'https://placehold.co/900', // TODO: фото врача
            name: 'Ужахов Мухаммад',
            description: 'Специалист по диагностике и лечению урологических заболеваний. Консультирует как первичных, так и повторных пациентов.',
            position: 'Уролог',
            link: 'doctors',
        },
        {
            id: 3,
            image: 'https://placehold.co/900', // TODO: фото врача
            name: 'Хачукаева Заира',
            description: 'Руководит лабораторией клиники. Проводит и интерпретирует лабораторные исследования.', // TODO: уточнить должность
            position: 'Лаборатория', // TODO: уточнить должность
            link: 'doctors',
        }
    ]
    return (
        <Slider {...settings}>
            {slides.map(slide => (
                <Doctor key={slide.id} {...slide} />
            ))}
        </Slider>
    );
}

