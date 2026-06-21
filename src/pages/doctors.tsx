import { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "@/shared/ui";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";

const doctors = [
  {
    name: 'Муйез Хадиджа',
    position: 'Терапевт, Гинеколог',
    description: 'Ведёт приём по терапии и гинекологии. Многолетний опыт работы в клинике «Здоровье+» — внимательный подход к каждому пациенту.',
    image: 'https://placehold.co/500', // TODO: фото врача
  },
  {
    name: 'Ужахов Мухаммад',
    position: 'Уролог',
    description: 'Специалист по диагностике и лечению урологических заболеваний. Консультирует как первичных, так и повторных пациентов.',
    image: 'https://placehold.co/500', // TODO: фото врача
  },
  {
    name: 'Хачукаева Заира',
    position: 'Врач-лаборант', // TODO: уточнить должность
    description: 'Руководит лабораторией клиники. Проводит и интерпретирует лабораторные исследования.', // TODO: уточнить должность и биографию
    image: 'https://placehold.co/500', // TODO: фото врача
  },
  {
    name: 'Оздоева Зарета',
    position: 'Пластический хирург', // TODO: уточнить должность
    description: 'Руководит лабораторией клиники. Проводит и интерпретирует лабораторные исследования.', // TODO: уточнить должность и биографию
    image: 'https://placehold.co/500', // TODO: фото врача
  },
  {
    name: 'Сурхоева Зухра',
    position: 'Педиатр', // TODO: уточнить должность
    description: 'Руководит лабораторией клиники. Проводит и интерпретирует лабораторные исследования.', // TODO: уточнить должность и биографию
    image: 'https://placehold.co/500', // TODO: фото врача
  },
]

const DoctorsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Врачи клиники «Здоровье+» — Назрань, Ингушетия</title>
        <meta name="description" content="Опытные врачи клиники «Здоровье+» в Назрани: терапевт, гинеколог, уролог, педиатр, пластический хирург. Запишитесь на приём: +7 928 799-73-99." key="description" />
        <meta name="keywords" content="врачи Назрань, терапевт Назрань, гинеколог Назрань, уролог Назрань, педиатр Назрань, запись к врачу Назрань" />
        <link rel="canonical" href={`${SITE_URL}/doctors`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Клиника «Здоровье+»" />
        <meta property="og:title" content="Врачи клиники «Здоровье+» — Назрань, Ингушетия" />
        <meta property="og:description" content="Терапевт, гинеколог, уролог, педиатр, пластический хирург — опытные врачи в Назрани." />
        <meta property="og:url" content={`${SITE_URL}/doctors`} />
      </Head>
      <PageLayout title="Наши врачи">
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mb: 6 }}>
            Наши врачи
          </Typography>
          <Grid container spacing={6}>
            {doctors.map(doctor => (
              <Grid size={{ xs: 12, md: 4 }} key={doctor.name}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={doctor.image}
                    alt={doctor.name}
                    sx={{
                      width: '100%',
                      borderRadius: 'var(--border-radius)',
                      mb: 2,
                    }}
                  />
                  <Typography variant="h5" sx={{ mb: 0.5 }}>
                    {doctor.name}
                  </Typography>
                  <Typography sx={{ color: '#8596A7', mb: 2 }}>
                    {doctor.position}
                  </Typography>
                  <Typography sx={{ color: '#585858', fontSize: 14, mb: 3, minHeight: 90 }}>
                    {doctor.description}
                  </Typography>
                  <Button variant="contained" href="/contacts">
                    Записаться на приём
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </PageLayout>
    </>
  )
}

export default DoctorsPage;
